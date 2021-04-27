require 'rails_helper'

describe Authorization, type: :library do
  subject(:auth){ described_class.new }

  before do
    stub_container
    container_mock(:accounts_repository)
  end

  describe '#load' do
    subject(:auth_load){ auth.load_account(headers: headers) }

    let(:auth_token){ 'token' }
    let(:headers) do
      {
        Authorization: "API #{auth_token}"
      }
    end

    context 'with stubbed JwtToken' do
      let(:mocked_payload){ { account_id: 42 } }

      before do
        allow(JwtToken).to receive(:decode).and_return(mocked_payload)
      end

      it 'returns account from repository based on given token' do
        account = auth_load
        expect(account.id).to eq(mocked_payload[:account_id])
      end

      it 'requests decoding from JwtToken' do
        auth_load
        expect(JwtToken).to have_received(:decode).with(auth_token)
      end
    end

    it 'raises DomainHandlers::InvalidToken' do
      accounts_repository = di_container.resolve(:accounts_repository)
      allow(accounts_repository).to receive(:find).and_raise(accounts_repository.class::RecordNotFound)

      expect{ auth_load }.to raise_error(DomainHandlers::InvalidToken)
    end

    context 'when headers are invalid' do
      let(:headers){ {} }

      it 'raises MissingToken when headers does include Authorization' do
        expect{ auth_load }.to raise_error(DomainHandlers::MissingToken)
      end
    end
  end
end
