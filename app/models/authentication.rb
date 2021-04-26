class Authentication
  include Dry::AutoInject(ProductManagement::Container)[repository: 'accounts_repository']

  def generate_token(email:, password:)
    account = find_account(email)
    authenticate(password)
    JwtToken.encode(account_id: account.id)
  end

  private

  def find_account(email)
    repository.find_by!(email: email)
  rescue repository.class::RecordNotFound => _e
    raise(ExceptionHandleable::MissingAccount, "Missing account with #{email}")
  end

  def authenticate(password)
    raise ExceptionHandleable::AuthenticationError, 'Invalid credentials' unless repository.authenticate(password)
  end
end
