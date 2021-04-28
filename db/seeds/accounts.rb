default_email, default_password = ENV['default_email'] || 'admin@localhost.com', ENV['default_password'] || '12341234'
account = Account.new(email: default_email, password: default_password, password_confirmation: default_password)

account.save(validate: false)
account.update_column(:token, Security::JwtToken.encode(account_id: account.id))
