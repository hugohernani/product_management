class AddUploadTypeToBatchUpload < ActiveRecord::Migration[6.1]
  def change
    add_column :batch_uploads, :upload_type, :string
  end
end
