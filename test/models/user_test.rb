# == Schema Information
#
# Table name: users
#
#  id                :integer          not null, primary key
#  email             :string
#  password_digest   :string
#  session_token     :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  medical_school_id :integer
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
