require 'swagger_helper'

RSpec.describe 'Blogs API', type: :request, swagger_doc: 'v1/products.yaml' do
  path '/products' do
    get 'List Products' do
      security [{ api_key: [] }]

      description 'Returns a list of products'

      response 200, 'A list of products' do
        let!(:products){ create_list(:product, 2) }
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        it_behaves_like 'api request with generated response', 'application/vnd.product_management.v1+json'
      end
    end

    post 'Create product' do
      security [{ api_key: [] }]
      operationId 'createProduct'
      description 'Creates a product'

      parameter name: :new_product, in: :body, schema: { '$ref' => '#/components/schemas/new_product' }
      response 201, 'A valid product to be created' do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:new_product) { { product: attributes_for(:product) } }
        schema '$ref' => '#/components/schemas/product'
        it_behaves_like 'api request with generated response', 'application/vnd.product_management.v1+json'
      end

      response 422, 'An invalid product' do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:new_product){ { product: Product.new } }
        schema '$ref' => '#/components/schemas/errors_object'
        it_behaves_like 'api request with generated response', 'application/vnd.product_management.v1+json'
      end
    end
  end

  path '/products/{id}' do
    # You'll want to customize the parameter types...
    parameter name: :id, in: :path, type: :string, description: 'id'

    get 'Show product' do
      security [{ api_key: [] }]

      response(200, 'A product') do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:id) { create(:product).id }

        schema '$ref' => '#/components/schemas/product'
        it_behaves_like 'api request with generated response', 'application/vnd.product_management.v1+json'
      end

      response(404, 'Product not found') do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:id) { 42 }

        schema '$ref' => '#/components/schemas/general_error'
        it_behaves_like 'api request with generated response', 'application/vnd.product_management.v1+json'
      end
    end

    patch 'Update product' do
      security [{ api_key: [] }]
      parameter name: :update_product, in: :body, schema: { '$ref' => '#/components/schemas/new_product' }

      response(204, 'A product') do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:id) { create(:product).id }
        let(:update_product){ attributes_for(:product) }

        run_test!
      end

      response 422, 'An invalid product' do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:id) { create(:product).id }
        let(:update_product){ { product: Product.new } }
        schema '$ref' => '#/components/schemas/errors_object'
        it_behaves_like 'api request with generated response', 'application/vnd.product_management.v1+json'
      end

      response(404, 'Product not found') do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:id) { 42 }
        let(:update_product){ }

        schema '$ref' => '#/components/schemas/general_error'
        run_test!
      end

    end

    put('update product') do
      security [{ api_key: [] }]
      parameter name: :update_product, in: :body, schema: { '$ref' => '#/components/schemas/new_product' }

      response(204, 'successful') do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:id) { create(:product).id }
        let(:update_product){ attributes_for(:product) }

        run_test!
      end

      response 422, 'An invalid product' do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:id) { create(:product).id }
        let(:update_product){ { product: Product.new } }
        schema '$ref' => '#/components/schemas/errors_object'
        it_behaves_like 'api request with generated response', 'application/vnd.product_management.v1+json'
      end

      response(404, 'Product not found') do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:id) { 42 }
        let(:update_product){ }

        schema '$ref' => '#/components/schemas/general_error'
        run_test!
      end
    end

    delete('delete product') do
      security [{ api_key: [] }]

      response(204, 'successful') do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:id) { create(:product).id }

        run_test!
      end

      response(404, 'Product not found') do
        let(:'X-API-Key'){ generate_token(create(:account).id) }
        let(:id) { 42 }

        schema '$ref' => '#/components/schemas/general_error'
        run_test!
      end
    end
  end
end
