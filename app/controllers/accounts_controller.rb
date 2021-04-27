class AccountsController < ApplicationController
  skip_before_action :authenticate_token!, only: [:create]

  def create
    account = accounts_repository.create!(account_params)
    auth_token = auth_service.generate_token(email: account.email, password: account.password)
    auth_response = { message: 'Account created', auth_token: auth_token }
    respond_with auth_response, location: v1_products_path # TODO: set to root_path
  end

  private

  def account_params
    params.permit(:email, :password, :password_confirmation)
  end

  def accounts_repository
    resolve('accounts_repository')
  end

  def auth_service
    resolve('use_cases.authentication')
  end
end
