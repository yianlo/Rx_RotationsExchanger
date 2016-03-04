# == Schema Information
#
# Table name: images
#
#  id         :integer          not null, primary key
#  url        :string
#  room_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class ImagesControllerTest < ActionController::TestCase
  test "should get :create" do
    get ::create
    assert_response :success
  end

  test "should get :update" do
    get ::update
    assert_response :success
  end

end
