class ApplicationRepository < ActiveRepository::Base
  def build(attributes)
    gateway.new(attributes)
  end

  def find(id)
    gateway.find(id)
  rescue DomainHandlers::ActiveRecordErrors
    raise RecordNotFound
  end

  def find_by!(attrs)
    gateway.find_by!(attrs)
  rescue DomainHandlers::ActiveRecordErrors
    raise RecordNotFound
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
