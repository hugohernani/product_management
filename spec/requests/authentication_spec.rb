require 'rails_helper'

RSpec.describe 'Authentications', type: :request do
  let(:valid_headers) do
    {
      'Content-Type' => 'application/json',
      'Accept' => 'application/json'
    }
  end

  describe 'POST /auth/login' do
    let!(:account){ create(:account) }

    context 'with valid credentials' do
      let(:valid_credentials) do
        {
          email: account.email,
          password: account.password
        }
      end

      before do
        post '/auth/login', params: valid_credentials, headers: headers, as: :json
      end

      it 'returns an authentication token' do
        byebug
        expect(json_response['auth_token']).not_to be_nil
      end
    end

    context 'with invalid credentials' do
      context 'when account does not exist' do
        let(:invalid_credentials) do
          {
            email: Faker::Internet.unique.email,
            password: Faker::Internet.password
          }
        end

        before do
          post '/auth/login', params: invalid_credentials, headers: valid_headers, as: :json
        end

        it 'returns a failure message' do
          expect(json_response['message']).to match(/Missing account/)
        end
      end
    end
  end
end
