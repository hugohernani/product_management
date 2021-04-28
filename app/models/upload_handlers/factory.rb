module UploadHandlers
  class Factory
    def self.upload_handler_for(batch_type)
      case batch_type.to_sym
      when :json
        JsonFileHandler.new
      else
        raise NotImplementedError, "Unknown handler for #{batch_type}"
      end
    end
  end
end
