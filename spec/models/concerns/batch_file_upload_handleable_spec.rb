require 'rails_helper'

describe BatchFileUploadHandleable do
  subject(:handler){ MockedHandlerWithExecution.new }

  let(:batch_repository) do
    instance_double('batch repository',
                    start_processing: nil, finish_processing: nil)
  end
  let(:batch_record){ instance_double('batch record', id: 42) }
  let(:resource_repository){ instance_double('resource repository') }

  describe '#process' do
    let(:content){ 'mocked content' }
    let(:listeners){ [MockedListener.new('listener 1'), MockedListener.new('listener 2')] }
    let(:process_args) do
      {
        batch_repository: batch_repository,
        batch_record: batch_record,
        resource_repository: resource_repository,
        content: content,
        listeners: listeners
      }
    end

    it 'calls for start_processing on batch_repository' do
      handler.process(**process_args)

      expect(batch_repository).to have_received(:start_processing).with(batch_record.id)
    end

    it 'calls for finish_processing on batch_repository' do
      handler.process(**process_args)

      expect(batch_repository).to have_received(:finish_processing).with(batch_record.id)
    end

    it 'delegates algorithm execution to handler' do
      expect do
        handler.process(**process_args)
      end.to output(resource_repository.inspect).to_stdout
    end
  end

  describe '#execute' do
    subject(:handler_without_execution){ MockedHandlerWithoutExecution.new }

    it 'raises NotImplementedError' do
      args = Array.new(handler_without_execution.method(:execute).arity.abs, any_args)
      expect do
        handler_without_execution.execute(*args)
      end.to raise_error(NotImplementedError, 'It should be implemented')
    end
  end
end

class MockedHandlerWithExecution
  include BatchFileUploadHandleable
  def execute(resource_repository, _batch_record, _process_opts = {})
    print resource_repository.inspect
  end
end

class MockedHandlerWithoutExecution
  include BatchFileUploadHandleable
end

class MockedListener
  def initialize(listener_id)
    @listerner_id = listener_id
  end

  def update(record)
    "#{listener_id} being called with #{record}"
  end

  private

  attr_reader :listener_id
end
