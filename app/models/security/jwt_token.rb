module Security
  class JwtToken
    HMAC_SECRET = Rails.application.secrets.secret_key_base
    HASH_ALGORITHM = 'HS256'.freeze

    class << self
      def encode(payload, opts = {})
        JWT.encode(payload, HMAC_SECRET, HASH_ALGORITHM, opts)
      end

      def decode(token, opts = {})
        opts = opts
               .merge(opts)
               .merge({ algorithm: HASH_ALGORITHM })
        decoded, _headers = JWT.decode(token, HMAC_SECRET, false, opts)

        HashWithIndifferentAccess.new(decoded)
      rescue JWT::DecodeError => e
        raise DomainHandlers::InvalidToken, e.message
      end
    end
  end
end
