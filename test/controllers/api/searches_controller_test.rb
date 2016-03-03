require 'test_helper'

class Api::SearchesControllerTest < ActionController::TestCase
  test "should get :show" do
    get ::show
    assert_response :success
  end

end
