FactoryBot.define do
  factory :product do
    title { Faker::Commerce.product_name }
    category { Faker::Commerce.material }
    rating { Faker::Number.within(1..5) }
    price { Faker::Commerce.price(range: 1...10_000) }
  end
end
