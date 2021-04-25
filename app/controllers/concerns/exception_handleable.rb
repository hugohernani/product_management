module ExceptionHandleable
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      standard_json_response({ message: e.message }, status: :not_found)
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      standard_json_response({ message: e.message }, status: :unprocessable_entity)
    end
  end
end
