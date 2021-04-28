module ExceptionHandler
  extend ActiveSupport::Concern

  included do
    rescue_from DomainHandlers::ServerError do |_e|
      standard_json_response({ message: 'Something went wrong', status: 500 }, status: 500)
    end

    rescue_from DomainHandlers::MissingParameter do |e|
      standard_json_response({ message: e.original_message, status: 400 }, status: 400)
    end

    rescue_from ActiveRepository::Base::RecordNotFound, DomainHandlers::MissingAccount do |e|
      standard_json_response({ message: e.message, status: 404 }, status: 404)
    end

    rescue_from ActiveRepository::Base::RecordInvalid, DomainHandlers::InvalidToken do |e|
      standard_json_response({ message: e.message, status: 422 }, status: 422)
    end

    rescue_from DomainHandlers::AuthenticationError, DomainHandlers::MissingToken do |e|
      standard_json_response({ message: e.message, status: 401 }, status: 401)
    end
  end
end
