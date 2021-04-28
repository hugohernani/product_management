module Security
  class Authentication
    include Dry::AutoInject(ProductManagement::Container)[repository: 'accounts_repository']

    def generate_token(email:, password:)
      account = find_account(email)
      authenticate(account, password)
      JwtToken.encode(account_id: account.id)
    end

    private

    def find_account(email)
      repository.find_by!(email: email)
    rescue repository.class::RecordNotFound => _e
      raise(DomainHandlers::MissingAccount, "Missing account with #{email}")
    end

    def authenticate(account, password)
      raise DomainHandlers::AuthenticationError, 'Invalid credentials' unless account.authenticate(password)
    end
  end
end
