module ExceptionHandleable
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  class InvalidToken < StandardError; end

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      standard_json_response({ message: e.message, status: 404 }, status: 404)
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      standard_json_response({ message: e.message, status: 422 }, status: 422)
    end
  end
end
