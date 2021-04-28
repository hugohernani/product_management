require 'rails_helper'

module V1
  module Products
    RSpec.describe 'Batches', type: :request do
      let(:account){ create(:account) }

      let(:valid_headers) do
        {
          'Content-Type' => 'application/json',
          'X-API-Key' => generate_token(account.id)
        }
      end

      describe 'POST /create' do
        context 'with valid attributes' do
          let(:file){ File.read(Rails.root.join('spec/fixtures/files/products.json')) }
          let(:base64_file){ Base64.strict_encode64(file) }
          let(:valid_attributes) do
            {
              file: base64_file
            }
          end

          before do
            post '/products/batch', params: valid_attributes, headers: valid_headers, as: :json
          end

          # async is default
          context "with async jobs" do
            it 'returns status code of 201' do
              expect(response).to have_http_status(:created)
            end

            it 'returns batch status as created' do
              expect(json_response['status']).to eq('created')
            end
          end

          context 'with inline jobs' do
            perform_jobs_inline

            it 'creates all products from file' do
              expect(Product.count).to eq JSON.parse(file).size
            end

            it 'moves Batch to finished' do
              batch_response_id = json_response['id']
              batch_response_status = json_response['status']
              batch_upload = BatchUpload.find(batch_response_id.to_i)

              expect(batch_response_status).to eq('created') # Batch is initially set to created
              expect(batch_upload.status).to eq('finished') # THe same batch is set to finished at the end
            end
          end
        end
      end
    end
  end
end
