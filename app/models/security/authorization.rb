module Security
  class Authorization
    include Dry::AutoInject(ProductManagement::Container)['accounts_repository']

    def load_account(headers:)
      token   = retrieve_header_token(headers)
      payload = decode_auth_token(token)
      retrieve_account(accounts_repository, payload)
    end

    private

    def retrieve_account(accounts_repository, payload)
      accounts_repository.find(payload[:account_id])
    rescue accounts_repository.class::RecordNotFound => _e
      raise(DomainHandlers::InvalidToken, "Missing account with #{payload[:account_id]}")
    end

    def decode_auth_token(token)
      JwtToken.decode(token)
    end

    def retrieve_header_token(headers)
      unless headers.key?('X-API-Key')
        raise DomainHandlers::MissingToken,
              'Missing Token on X-API-Key header'
      end

      headers['X-API-Key'].split(' ').last
    end
  end
end
