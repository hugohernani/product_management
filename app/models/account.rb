class Account < ApplicationRecord
  validates :email, presence: true, uniqueness: true

  has_secure_password
end
