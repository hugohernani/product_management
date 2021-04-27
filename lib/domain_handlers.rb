module DomainHandlers
  class InvalidToken < StandardError; end

  class MissingToken < StandardError; end

  class MissingAccount < StandardError; end

  class AuthenticationError < StandardError; end

  module ActiveRecordErrorHandlers
    def self.included(base)
      ActiveRecord::ActiveRecordError.subclasses.each do |ar_klass|
        _ar_base, klass_name = ar_klass.name.split('::')
        base.const_set(klass_name, Class.new(ar_klass))
      end

      unless base.constants.include?('RecordInvalid')
        base.const_set('RecordInvalid', Class.new(ActiveRecord::RecordInvalid))
      end
    end
  end

  class ActiveRecordErrors
    def self.===(exception)
      exception.is_a?(ActiveRecord::ActiveRecordError)
    end
  end
end
