module ExceptionHandler
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRepository::Base::RecordNotFound, DomainHandlers::MissingAccount do |e|
      standard_json_response({ message: e.message, status: 404 }, status: 404)
    end

    rescue_from ActiveRepository::Base::RecordInvalid, DomainHandlers::InvalidToken do |e|
      standard_json_response({ message: e.message, status: 422 }, status: 422)
    end

    rescue_from DomainHandlers::AuthenticationError do |e|
      standard_json_response({ message: e.message, status: 401 }, status: 401)
    end
  end
end
