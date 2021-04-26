require 'rails_helper'
require 'dry/container/stub'

describe Authorization, type: :library do
  subject(:auth){ described_class.new }

  before do
    ProductManagement::Container.enable_stubs!
    ProductManagement::Container.stub(:users_repository, MockedUsersRepository.new)
  end

  describe '#load' do
    subject(:auth_load){ auth.load_user(headers: headers) }

    let(:auth_token){ 'token' }
    let(:headers) do
      {
        Authorization: "API #{auth_token}"
      }
    end

    context 'with stubbed JwtToken' do
      let(:mocked_payload){ { user_id: 42 } }

      before do
        allow(JwtToken).to receive(:decode).and_return(mocked_payload)
      end

      it 'returns user from repository based on given token' do
        user = auth_load
        expect(user.id).to eq(mocked_payload[:user_id])
      end

      it 'requests decoding from JwtToken' do
        auth_load
        expect(JwtToken).to have_received(:decode).with(auth_token)
      end
    end

    it 'raises ExceptionHandleable::InvalidToken' do
      users_repository = ProductManagement::Container.resolve(:users_repository)
      allow(users_repository).to receive(:find).and_raise(MockedUsersRepository::RecordNotFound)

      expect{ auth_load }.to raise_error(ExceptionHandleable::InvalidToken)
    end

    context 'when headers are invalid' do
      let(:headers){ {} }

      it 'raises MissingToken when headers does include Authorization' do
        expect{ auth_load }.to raise_error(ExceptionHandleable::MissingToken)
      end
    end
  end
end

class MockedUsersRepository
  class RecordNotFound < StandardError; end

  def find(id)
    OpenStruct.new(id: id)
  end
end
