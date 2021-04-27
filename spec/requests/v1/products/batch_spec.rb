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

          it 'returns status code of 201' do
            expect(response).to have_http_status(:created)
          end

          it 'returns response of products batch starting execution' do
            # TODO:
          end
        end
      end
    end
  end
end
