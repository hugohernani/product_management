class ApplicationRepository < ActiveRepository::Base
  def build(attributes)
    gateway.new(attributes)
  end

  def save(gateway_instance, opts = {})
    gateway_instance.save(**opts)
  end

  def update(gateway_instance, attributes, opts = {})
    gateway_instance.update(attributes, **opts)
  end

  def destroy(gateway_instance)
    gateway_instance.destroy
  end
end
