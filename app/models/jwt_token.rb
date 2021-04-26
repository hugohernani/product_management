class JwtToken
  HMAC_SECRET = Rails.application.secrets.secret_key_base
  HASH_ALGORITHM = 'HS256'.freeze

  class << self
    def encode(payload, opts = {})
      payload[:exp] ||= opts.delete(:exp){ 24.hours.from_now }.to_i

      JWT.encode(payload, HMAC_SECRET, HASH_ALGORITHM, opts)
    end

    def decode(token, opts = {})
      opts = default_decode_opts
             .merge(opts)
             .merge({ algorithm: HASH_ALGORITHM })
      decoded, _headers = JWT.decode(token, HMAC_SECRET, true, opts)

      HashWithIndifferentAccess.new(decoded)
    rescue JWT::DecodeError => e
      raise ExceptionHandleable::InvalidToken, e.message
    end

    private

    def default_decode_opts
      {
        verification_expiration: true
      }
    end
  end
end
