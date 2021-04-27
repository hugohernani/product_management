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
end
