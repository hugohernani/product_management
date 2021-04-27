require 'rails_helper'

class MockBaseRepo
  include ActiveRepository::ArErrorClasses
end

module DomainHandlers
  describe ActiveRecordErrorHandlers do
    it 'includes a subclass of ActiveRecord::RecordNotFound of the class with ArErrorClasses extended' do
      expect(MockBaseRepo.const_get('RecordNotFound').superclass).to eq ActiveRecord::RecordNotFound
    end

    it 'includes all ActiveRecord error classes' do
      ActiveRecord::ActiveRecordError.subclasses.each do |ar_class|
        expect do
          MockBaseRepo.const_get(ar_class.name)
        end.not_to raise_error
      end
    end
  end
end
