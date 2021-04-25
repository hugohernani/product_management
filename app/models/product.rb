class Product < ApplicationRecord
  validates :title, :category, :price, presence: true
  validates :price, numericality: {
    less_than: 10_000.00,
    greater_than_or_equal_to: 0
  }
end
