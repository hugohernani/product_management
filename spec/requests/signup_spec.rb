require 'rails_helper'

RSpec.describe 'Sign up', type: :request do
  let(:valid_headers) do
    {
      'Content-Type' => 'application/json',
      'Accept' => 'application/json'
    }
  end

  describe 'POST /auth/signup' do
    context 'with valid credentials' do
      let(:valid_credentials) do
        attributes_for(:account)
      end

      before do
        post '/auth/signup', params: valid_credentials, headers: headers, as: :json
      end

      it 'creates an user' do
        expect(response).to have_http_status(:created)
      end

      it 'returns successful message' do
        expect(json_response[:message]).to match(/Account created/)
      end

      it 'retusn authorization token' do
        expect(json_response[:auth_token]).not_to be_nil
      end
    end

    context 'with invalid credentials' do
      context 'when account does not exist' do
        let(:invalid_credentials) do
          {}
        end

        before do
          post '/auth/signup', params: invalid_credentials, headers: valid_headers, as: :json
        end

        it 'returns a failure message' do
          expect(json_response['message']).to match(/Email can't be blank, Password can't be blank/)
        end
      end
    end
  end
end
