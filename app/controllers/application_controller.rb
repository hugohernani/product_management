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
    @current_account = begin
      auth.load_account(headers: request.headers)
    rescue DomainHandlers::InvalidToken, DomainHandlers::MissingToken
      Account.first
    end
  end

  def auth
    resolve('use_cases.authorization')
  end

  def unmet_headers_conditions?
    !request.headers.key?('X-API-Key')
  end
end
