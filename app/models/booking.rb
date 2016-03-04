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

class Booking < ActiveRecord::Base
  validates :room_id, :booker_id, :to_date, :from_date, :status, presence: true
  validates :status, inclusion: { in: ["pending", "approved", "denied"] }

  belongs_to :room

  belongs_to :booker,
    class_name: "User",
    foreign_key: :booker_id
end
