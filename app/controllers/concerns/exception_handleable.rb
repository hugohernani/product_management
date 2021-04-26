module ExceptionHandleable
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  class InvalidToken < StandardError; end
  class MissingToken < StandardError; end
  class MissingAccount < StandardError; end
  class AuthenticationError < StandardError; end

  included do
    rescue_from ActiveRecord::RecordNotFound, ExceptionHandleable::MissingAccount do |e|
      standard_json_response({ message: e.message, status: 404 }, status: 404)
    end

    rescue_from ActiveRecord::RecordInvalid, ExceptionHandleable::InvalidToken do |e|
      standard_json_response({ message: e.message, status: 422 }, status: 422)
    end

    rescue_from ExceptionHandleable::AuthenticationError do |e|
      standard_json_response({ message: e.message, status: 401 }, status: 401)
    end

  end
end
