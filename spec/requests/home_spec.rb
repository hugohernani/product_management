require 'rails_helper'

RSpec.describe 'Homes', type: :request do
  describe 'GET /' do
    before do
      get root_path, headers: {}, as: :json
    end

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'returns welcome message' do
      expect(response.body).to eq 'Ruby on Rails Challenge 20200810'
    end
  end
end
