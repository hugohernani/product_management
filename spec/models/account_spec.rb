require 'rails_helper'

RSpec.describe Account, type: :model do
  %i[email password].each do |attr|
    it { is_expected.to validate_presence_of(attr) }
  end
end
