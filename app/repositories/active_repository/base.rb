class ActiveRepository::Base < SimpleDelegator
  include DomainHandlers::ActiveRecordErrorHandlers

  def initialize(gateway:)
    @gateway = gateway
    super(@gateway)
  end

  protected

  attr_reader :gateway
end
