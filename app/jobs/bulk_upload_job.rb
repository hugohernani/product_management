class BulkUploadJob < ApplicationJob
  queue_as :default

  def perform(batch_id, processable_content, repository_name)
    BulkUpload.new.handle_batch(batch_id, processable_content, repository_for(repository_name))
  end

  private
  def repository_for(repo_name)
    ProductManagement::Container.resolve(repo_name)
  end
end
