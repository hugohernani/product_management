module BatchFileUploadHandleable
  include Observable

  def process(
    batch_repository:, batch_record:, resource_repository:,
    content:, listeners: [BatchFileUploadNullListener.new]
  )
    listeners.each{ |listener| add_observer(listener) }
    batch_repository.start_processing(batch_record.id)
    execute(resource_repository, content, batch_repository: batch_repository, batch_record: batch_record)
    batch_repository.finish_processing(batch_record.id)
  end

  def execute(_batch_repository, _batch_record, _process_opts = {})
    raise NotImplementedError, 'It should be implemented'
  end

  protected

  # Expected an enumerable/collection object and a repository as arguments
  def create_resources(resources_list, repository)
    resources_list.each do |attributes|
      record = repository.create(attributes)
      changed if record.persisted?
      notify_observers(record)
    end
  end
end
