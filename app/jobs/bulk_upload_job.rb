class BulkUploadJob < ApplicationJob
  queue_as :default

  def perform(batch_id, processable_content, resource_repository)
    BulkUpload.new.handle_batch(batch_id, processable_content, resource_repository)
  end
end
