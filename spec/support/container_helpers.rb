require 'dry/container/stub'

module ContainerHelpers
  def stub_container
    di_container.enable_stubs!
  end

  def container_mock(registered_name, mock_klass = nil)
    di_container.stub(registered_name, mock_klass || registered_mocks[registered_name])
  end

  def container_unmock(registered_name)
    di_container.unstub(registered_name)
  end

  def di_container
    @di_container ||= ProductManagement::Container
  end

  private

  def registered_mocks
    {
      accounts_repository: MockedAccountsRepository.new
    }
  end

  class MockedAccountsRepository
    class RecordNotFound < StandardError; end

    def find(id)
      OpenStruct.new(id: id)
    end

    def find_by!(email)
      OpenStruct.new(email: email)
    end

    def update(_record, attrs)
      OpenStruct.new(**attrs)
    end

    def authenticate(_password)
      force_flag
    end
  end
end
