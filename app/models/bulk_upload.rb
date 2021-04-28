class BulkUpload
  include Dry::AutoInject(ProductManagement::Container)[batch_repository: 'batch_upload_repository']

  def enqueue_batch(processable_content:, upload_type:, account_id:, repository_name:)
    batch_upload = batch_repository.create!(account_id: account_id, upload_type: upload_type)
    BulkUploadJob.perform_later(batch_upload.id, processable_content, repository_name)
    batch_upload
  end

  def handle_batch(batch_upload_id, processable_content, resource_repository)
    batch_record = batch_repository.find(batch_upload_id)
    batch_handler = UploadHandlers::Factory.upload_handler_for(batch_record.upload_type)
    batch_handler.process(
      batch_repository: batch_repository,
      batch_record: batch_record,
      resource_repository: resource_repository,
      content: processable_content
    )
  end
end
