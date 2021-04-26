class Authorization
  include Dry::AutoInject(ProductManagement::Container)['users_repository']

  def load_user(headers:)
    indifferent_headers = HashWithIndifferentAccess.new(headers)
    token   = retrieve_header_token(indifferent_headers)
    payload = decode_auth_token(token)
    retrieve_user(users_repository, payload)
  end

  private

  def retrieve_user(users_repository, payload)
    users_repository.find(payload[:user_id])
  rescue users_repository.class::RecordNotFound => _e
    raise(ExceptionHandleable::InvalidToken, "Missing user with #{payload[:user_id]}")
  end

  def decode_auth_token(token)
    JwtToken.decode(token)
  end

  # check for token in `Authorization` header
  def retrieve_header_token(headers)
    unless headers.key?('Authorization')
      raise ExceptionHandleable::MissingToken,
            'Missing Token on Authorization header'
    end

    headers['Authorization'].split(' ').last
  end
end
