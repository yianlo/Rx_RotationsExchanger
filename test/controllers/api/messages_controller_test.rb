require 'test_helper'

class Api::MessagesControllerTest < ActionController::TestCase
  test "should get :new" do
    get ::new
    assert_response :success
  end

end
