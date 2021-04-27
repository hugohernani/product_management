require 'rails_helper'

describe ApplicationRepository do
  subject(:app_repo){ described_class.new(gateway: gateway) }

  let(:gateway){ MockedGateway }

  describe '#build' do
    let(:attrs){ { id: 42, name: 'Jack Sparrow' } }

    it 'invokes build on gateway' do
      allow(gateway).to receive(:new)

      _gateway_response = app_repo.build(attrs)
      expect(gateway).to have_received(:new).with(attrs)
    end

    it 'returns an object from the gateway' do
      instance = app_repo.build(attrs)
      expect(instance).to be_a(gateway)
    end
  end

  describe '#find' do
    let(:id){ 42 }

    it "invokes 'find' on gateway" do
      allow(gateway).to receive(:find)

      _gateway_response = app_repo.find(id)
      expect(gateway).to have_received(:find).with(id)
    end

    it 'raises repository not found error' do
      allow(gateway).to receive(:find).and_raise(StandardError)
    end
  end
end
