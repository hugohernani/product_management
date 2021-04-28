Rack::Attack.safelist('allow from localhost') do |req|
  # Requests are allowed if the return value is truthy
  req.ip == '127.0.0.1' || req.ip == '::1'
end

Rack::Attack.throttle('req/ip', limit: 5, period: 1.second) do |req|
  req.ip
end
