class ApplicationController < ActionController::API
  include ExceptionHandleable
  respond_to :json

  def standard_json_response(object, status:)
    render json: object, status: status
  end
end
