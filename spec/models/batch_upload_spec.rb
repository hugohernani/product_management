require 'rails_helper'

RSpec.describe BatchUpload, type: :model do
  context 'with associations' do
    %i[account].each do |assoc|
      it { is_expected.to belong_to(assoc) }
    end
  end
end
