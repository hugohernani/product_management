class AuthenticationController < ApplicationController
  skip_before_action :authenticate_token!, only: [:create]

  def create
    auth_token = auth_service.generate_token(email: auth_params[:email], password: auth_params[:password])
    auth_response = {
      auth_token: auth_token
    }
    respond_with auth_response, location: root_path
  end

  private

  def auth_params
    params.permit(:email, :password)
  end

  def auth_service
    resolve('use_cases.authentication')
  end
end
