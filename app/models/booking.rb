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
  validates :room_id, :booker_id, :checkout_date, :checkin_date, presence: true
  validates :status, inclusion: { in: ["pending", "approved", "denied"] }

  belongs_to :room

  belongs_to :booker,
    class_name: "User",
    foreign_key: :booker_id
  #
  #
  def total_price
    price ||= (checkout_date - checkin_date)/3600/24 * room.price
  end

  def approve
    update(status: "approved")

    time_block_1 = checkin_date - room.from_date
    time_block_2 = room.to_date - checkout_date

    if time_block_1 > time_block_2
      room.update(to_date: checkin_date)
    else
      room.update(from_date: checkout_date)
    end

    self
  end

  def deny
    update(status: "denied")

    self
  end
end
