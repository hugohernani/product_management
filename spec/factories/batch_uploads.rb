FactoryBot.define do
  factory :batch_upload do
    account

    BatchUpload.statuses.each do |status_key, status_value|
      trait status_key.to_sym do
        status { status_value }
      end
    end
  end
end
