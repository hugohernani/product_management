require 'rails_helper'

RSpec.describe Product, type: :model do
  %i[title category price].each do |attr|
    it { is_expected.to validate_presence_of(attr) }
  end

  describe '#price' do
    it 'validates precision limits' do
      is_expected.to validate_numericality_of(:price)
        .is_less_than(10_000.00)
        .is_greater_than_or_equal_to(0)
    end
  end
end
