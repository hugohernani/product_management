class BatchUpload < ApplicationRecord
  belongs_to :account, class_name: 'Account'

  enum status: { created: 0, processing: 1, finished: 2 }

  validates :account, :upload_type, presence: true
end
