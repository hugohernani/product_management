class CreateBatchUploads < ActiveRecord::Migration[6.1]
  def change
    create_table :batch_uploads do |t|
      t.references :account, null: false, foreign_key: true, index: true
      t.integer :status, default: BatchUpload.statuses[:created]

      t.timestamps
    end
  end
end
