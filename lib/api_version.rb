class ApiVersion
  attr_reader :version, :default

  def initialize(version, default: false)
    @version = version
    @default = default
  end

  def matches?(request)
    check_headers(request.headers) || default
  end

  private

  def check_headers(headers)
    headers[:accept]&.include?("application/vnd.product_management.#{version}+json")
  end
end
