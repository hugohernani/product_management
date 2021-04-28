require 'rails_helper'

module Security
  describe JwtToken, type: :library do
    let(:payload){ {user_id: 42}.with_indifferent_access }

    describe '#encode' do
      it 'generates a token' do
        encoded_result = described_class.encode(payload)
        expect(encoded_result).not_to be_empty
      end

      it 'calls for encode on JWT' do
        allow(JWT).to receive(:encode).and_call_original

        described_class.encode(payload)
        expect(JWT).to have_received(:encode)
          .with(payload, described_class::HMAC_SECRET, described_class::HASH_ALGORITHM, {})
      end
    end

    describe '#decode' do
      let(:valid_token){ JWT.encode(payload, described_class::HMAC_SECRET, described_class::HASH_ALGORITHM) }

      it 'decodes a valid token' do
        decoded = described_class.decode(valid_token)
        expect(decoded).to eq payload
      end

      it 'calls for decode on JWT' do
        allow(JWT).to receive(:decode).and_call_original

        described_class.decode(valid_token)
        expect(JWT).to have_received(:decode)
          .with(valid_token, described_class::HMAC_SECRET, true, {
            algorithm: described_class::HASH_ALGORITHM,
            verification_expiration: true
          })
      end

      it 'rescues from JWT::DecodeError for invalid token and raise InvalidToken error' do
        expect{ described_class.decode('invalid_token') }.to raise_error(DomainHandlers::InvalidToken)
      end
    end
  end
end
