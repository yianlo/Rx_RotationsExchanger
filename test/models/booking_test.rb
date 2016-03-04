# == Schema Information
#
# Table name: bookings
#
#  id            :integer          not null, primary key
#  room_id       :integer
#  booker_id     :integer
#  checkout_date :datetime
#  checkin_date  :datetime
#  message       :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  status        :string           default("pending")
#

require 'test_helper'

class BookingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
