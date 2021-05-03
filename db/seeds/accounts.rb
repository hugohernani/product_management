default_email, default_password = ENV['default_email'] || 'admin@localhost.com', ENV['default_password'] || 'lssXeG1U6%6m'
account = Account.new(email: default_email, password: default_password, password_confirmation: default_password)

account.save
account.update_column(:token, Security::JwtToken.encode(account_id: account.id))
