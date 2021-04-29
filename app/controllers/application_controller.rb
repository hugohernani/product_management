class ApplicationController < ActionController::API
  include ExceptionHandler
  respond_to :json

  before_action :authenticate_token!

  protected

  attr_reader :current_account

  def standard_json_response(object, status:)
    render json: object, status: status
  end

  private

  def authenticate_token!
    # TODO: Use first user token while demo
    headers['X-API-Key'] ||= Account.first&.token if Rails.env.production?
    @current_account = auth.load_account(headers: request.headers)
  end

  def auth
    resolve('use_cases.authorization')
  end
end
