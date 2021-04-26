require 'swagger_helper'

RSpec.describe 'Blogs API', type: :request, swagger_doc: 'v1/products.yaml' do
  path '/products' do
    get 'List Products' do
      description 'Return list of products'

      response 200, 'A list of products' do
        let!(:products){ create_list(:product, 2) }
        it_behaves_like 'api request with generated response'
      end
    end

    post 'Create product' do
      operationId 'createProduct'
      description 'Creates a product'

      parameter name: :new_product, in: :body, schema: { '$ref' => '#/components/schemas/new_product' }
      response 201, 'A product' do
        let(:new_product) { { product: attributes_for(:product) } }
        schema '$ref' => '#/components/schemas/product'
        it_behaves_like 'api request with generated response'
      end
    end
  end

  path '/products/{id}' do
    # You'll want to customize the parameter types...
    parameter name: :id, in: :path, type: :string, description: 'id'

    get 'Show product' do
      response(200, 'A product') do
        let(:id) { create(:product).id }

        schema '$ref' => '#/components/schemas/product'
        it_behaves_like 'api request with generated response'
      end
    end

    patch 'Update product' do
      parameter name: :update_product, in: :body, schema: { '$ref' => '#/components/schemas/new_product' }

      response(204, 'A product') do
        let(:id) { create(:product).id }
        let(:update_product){ attributes_for(:product) }

        run_test!
      end
    end

    put('update product') do
      parameter name: :update_product, in: :body, schema: { '$ref' => '#/components/schemas/new_product' }

      response(204, 'successful') do
        let(:id) { create(:product).id }
        let(:update_product){ attributes_for(:product) }

        run_test!
      end
    end

    delete('delete product') do
      response(204, 'successful') do
        let(:id) { create(:product).id }

        run_test!
      end
    end
  end
end
