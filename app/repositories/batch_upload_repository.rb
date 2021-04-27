class BatchUploadRepository < ApplicationRepository
  def start_processing(batch_id)
    batch_instance = find(batch_id)
    batch_instance.processing!
  end

  def finish_processing(batch_id)
    batch_instance = find(batch_id)
    batch_instance.finished!
  end
end
