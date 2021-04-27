class Authorization
  include Dry::AutoInject(ProductManagement::Container)['accounts_repository']

  def load_account(headers:)
    indifferent_headers = HashWithIndifferentAccess.new(headers)
    token   = retrieve_header_token(indifferent_headers)
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
    unless headers.key?('Authorization')
      raise DomainHandlers::MissingToken,
            'Missing Token on Authorization header'
    end

    headers['Authorization'].split(' ').last
  end
end
