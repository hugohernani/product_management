class ActiveRepository::Base < SimpleDelegator
  def initialize(gateway:)
    @gateway = gateway
    super(@gateway)
  end

  protected

  attr_reader :gateway
end
