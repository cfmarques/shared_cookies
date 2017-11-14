require 'sinatra'
require 'sinatra/cross_origin'
require 'securerandom'
require 'json'
require 'pry'

configure do
  enable :cross_origin
end

before do
  response.headers['Access-Control-Allow-Origin'] = request.env['HTTP_ORIGIN']
  response.headers["Access-Control-Allow-Credentials"] = 'true'
end

COOKIE_NAME = '_server.cookie'

options "*" do
  response.headers["Allow"] = "GET, POST, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  200
end

post '/cookie' do
  response.set_cookie(COOKIE_NAME, cookie_data)
  cookie_data
end

def cookie_data
  @cookie ||= request.cookies[COOKIE_NAME] || create_cookie
end

def create_cookie
  JSON.dump({ id: SecureRandom.uuid, creation_time: Time.now.to_s })
end