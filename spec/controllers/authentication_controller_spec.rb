require 'rails_helper'

RSpec.describe AuthenticationController, type: :controller do
  describe 'POST #create' do
    let(:account){ create(:account) }

    it 'returns http created' do
      post :create, params: { email: account.email, password: account.password }, format: :json
      expect(response).to have_http_status(:created)
    end
  end
end
