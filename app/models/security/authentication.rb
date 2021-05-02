module Security
  class Authentication
    include Dry::AutoInject(ProductManagement::Container)[repository: 'accounts_repository']

    def generate_token(email:, password:)
      account = find_account(email)
      authenticate(account, password)
      token = JwtToken.encode(account_id: account.id)
      repository.update(account, {token: token})
      token
    end

    private

    def find_account(email)
      repository.find_by!(email: email)
    rescue repository.class::RecordNotFound => _e
      raise(DomainHandlers::MissingAccount, "Missing account with email: #{email}")
    end

    def authenticate(account, password)
      raise DomainHandlers::AuthenticationError, 'Invalid credentials' unless account.authenticate(password)
    end
  end
end
