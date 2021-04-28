require 'swagger_helper'

RSpec.describe 'Blogs API', type: :request, swagger_doc: 'v1/products.yaml' do
  path '/products/batch' do
    post 'Create products' do
      security [{ api_key: [] }]
      operationId 'createProducts'
      description 'Creates a list of products from a provided file'

      parameter name: :batch_file, in: :body, schema: { '$ref' => '#/components/schemas/new_products_batch' }
      response 201, 'A products creation process is created and beying process on the background' do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:file){ File.read(Rails.root.join('spec/fixtures/files/products.json')) }
        let(:batch_file){ Base64.strict_encode64(file) }

        schema '$ref' => '#/components/schemas/batch_upload'
        it_behaves_like 'api request with generated response'
      end
    end
  end
end
