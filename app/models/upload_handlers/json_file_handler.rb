module UploadHandlers
  class JsonFileHandler
    include BatchFileUploadHandleable

    def execute(resource_repo, base64_content, _process_opts = {})
      content        = Base64.decode64(base64_content)
      parsed_content = JSON.parse(content)
      create_resources(parsed_content, resource_repo)
    end
  end
end
