module RequestHelpers
  def json_response
    json_res = JSON.parse(response.body)
    return json_res.map!(&:with_indifferent_access) if json_res.is_a?(Array)

    HashWithIndifferentAccess.new(json_res)
  end

  def generate_token(account_id)
    Security::JwtToken.encode({ account_id: account_id }, { exp: 1.minute.from_now })
  end
end
