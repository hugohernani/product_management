require 'rails_helper'

RSpec.describe 'Products API', type: :request, document: false do
  let(:account){ create(:account) }

  let(:valid_headers) do
    {
      'Content-Type' => 'application/json',
      'X-API-Key' => generate_token(account.id)
    }
  end

  describe 'GET /products' do
    let(:products_count){ 2 }

    before do
      create_list(:product, products_count)
      get '/products', headers: valid_headers, as: :json
    end

    it 'renders a successful response' do
      expect(json_response.size).to eq products_count
    end

    it 'returns status code of 200' do
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET /products/:id' do
    context 'when product exist' do
      let!(:product){ create(:product) }

      before do
        get "/products/#{product.id}", headers: valid_headers, as: :json
      end

      it 'renders a successful response' do
        expect(json_response['id']).to eq product.id
      end
    end

    context 'when product does not exist' do
      before do
        get '/products/42', headers: valid_headers, as: :json
      end

      it 'returns status code of 404' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'POST /products' do
    context 'with valid parameters' do
      let(:product_title){ Faker::Commerce.unique.product_name }

      let(:valid_attributes) do
        {
          product: attributes_for(:product, title: product_title).except(:id)
        }
      end

      before do
        post '/products', params: valid_attributes, headers: valid_headers, as: :json
      end

      it 'creates a product' do
        expect(json_response['title']).to eq product_title
      end

      it 'returns status code of 201' do
        expect(response).to have_http_status(:created)
      end

      it 'returns json content type' do
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end

    context 'with invalid parameters' do
      let(:invalid_attributes) do
        {
          product: attributes_for(:product, title: nil)
        }
      end

      before do
        post '/products', params: invalid_attributes, headers: valid_headers, as: :json
      end

      it 'does not create a product' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'renders a JSON response with errors for the new product' do
        expect(json_response['errors']['title']).to include(/can't be blank/)
      end
    end
  end

  describe 'PUT /products/:id' do
    context 'with valid parameters' do
      let!(:product){ create(:product) }

      let(:new_title){ Faker::Commerce.unique.product_name }

      let(:new_attributes) do
        {
          product: attributes_for(:product, title: new_title)
        }
      end

      before do
        put "/products/#{product.id}", params: new_attributes, headers: valid_headers, as: :json
      end

      it 'updates the requested product' do
        expect(product.reload.title).to eq(new_title)
      end

      it 'returns status code of 204' do
        expect(response).to have_http_status(:no_content)
      end
    end

    context 'with invalid parameters' do
      let!(:product){ create(:product) }

      let(:invalid_attributes) do
        {
          product: attributes_for(:product, title: nil)
        }
      end

      before do
        put "/products/#{product.id}", params: invalid_attributes, headers: valid_headers, as: :json
      end

      it 'returns a status code of 422' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /products/:id' do
    let!(:product){ create(:product) }

    before do
      delete "/products/#{product.id}", headers: valid_headers
    end

    it 'returns a stauts code of 204' do
      expect(response).to have_http_status(:no_content)
    end
  end
end
