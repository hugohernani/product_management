module DomainHandlers
  class InvalidToken < StandardError; end

  class MissingToken < StandardError; end

  class MissingAccount < StandardError; end

  class AuthenticationError < StandardError; end

  class ActiveRecordErrors
    def self.===(exception)
      exception.is_a?(ActiveRecord::ActiveRecordError)
    end
  end

  class MissingParameter
    def self.===(exception)
      exception.is_a?(ActionController::ParameterMissings)
    end
  end

  # Default Unknown
  class ServerError
    def self.===(exception)
      exception.is_a?(StandardError)
    end
  end
end
