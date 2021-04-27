require 'rails_helper'

describe Authentication do
  subject(:auth){ described_class.new }

  before do
    stub_container
    container_mock(:accounts_repository)
  end

  describe '#generate_token' do
    let(:repository){ di_container.resolve(:accounts_repository) }

    context "when there isn't an account with provided info" do
      let(:email){ 'email@host.com' }
      let(:password){ 'any' }

      it 'raises record not found from repository' do
        allow(repository).to receive(:find_by!).and_raise(repository.class::RecordNotFound)
        expect do
          auth.generate_token(email: email, password: password)
        end.to raise_error(DomainHandlers::MissingAccount)
      end
    end

    context 'when there is an account with provided info' do
      let(:account){ instance_double('Account', id: 42, email: 'email@host.com', password: 'Mypass1$') }

      before do
        allow(repository).to receive(:find_by!).and_return(account)
      end

      it 'raises AuthenticationError when authentication fails' do
        allow(repository).to receive(:authenticate).and_return(false)

        expect do
          auth.generate_token(email: account.email, password: 'anypass')
        end.to raise_error(DomainHandlers::AuthenticationError)
      end

      it 'delegates token generation to JwtToken based on account id' do
        allow(JwtToken).to receive(:encode)
        allow(repository).to receive(:authenticate).and_return(true)

        auth.generate_token(email: account.email, password: account.password)
        expect(JwtToken).to have_received(:encode).with(account_id: account.id)
      end
    end
  end
end
