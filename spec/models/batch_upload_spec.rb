require 'rails_helper'

RSpec.describe BatchUpload, type: :model do
  context 'with associations' do
    %i[account].each do |assoc|
      it { is_expected.to belong_to(assoc) }
    end
  end

  context 'with validations' do
    %i[account upload_type].each do |attr|
      it { is_expected.to validate_presence_of(attr) }
    end
  end
end
