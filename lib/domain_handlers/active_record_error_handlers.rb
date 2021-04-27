module DomainHandlers
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
end
