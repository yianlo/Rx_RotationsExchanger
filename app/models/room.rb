# == Schema Information
#
# Table name: rooms
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text
#  host_id     :integer
#  lat         :float            not null
#  lng         :float            not null
#  img_url     :string
#  price       :integer          not null
#  from_date   :datetime
#  to_date     :datetime
#  home_type   :string
#  room_type   :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Room < ActiveRecord::Base
  validates :title, :lat, :lng, :price, :home_type, :room_type, :from_date, :to_date, presence: true
  validates :lat, :lng, :price, numericality: true

  validates :home_type, inclusion: { in: ["House", "Apt/ Condo", "Studio"] }
  validates :room_type, inclusion: { in: ["Private room", "Public room"] }

  belongs_to :host,
    class_name: "User",
    foreign_key: :host_id

  has_many :images, dependent: :destroy


  def self.filter_by_params(params)

    result = in_bounds(params[:bounds]) &
    in_price_range(params[:price_range]) &
    checked_home_type(params[:home_types]) &
    checked_room_type(params[:room_types]) &
    in_date_range(params[:date_range])

    return result
  end

  def self.in_bounds(bounds)
    return if bounds.nil? || bounds.empty?

    Room.includes(:images).where(
      lat: Float(bounds["southWest"]["lat"])...Float(bounds["northEast"]["lat"]),
      lng: Float(bounds["southWest"]["lng"])...Float(bounds["northEast"]["lng"])
    )
  end

  def self.in_price_range(price_range)
    return self.all if (price_range[0] == "0" && price_range[1] == "501")

    Room.includes(:images).where(price: price_range[0]..price_range[1])
  end

  def self.checked_home_type(home_types)
    return self.all if home_types.nil? || home_types.empty?
    Room.includes(:images).where(home_type: home_types)
  end

  def self.checked_room_type(room_types)
    return self.all if room_types.nil? || room_types.empty?
    Room.includes(:images).where(room_type: room_types)
  end

  def self.in_date_range(date_range)
    return self.all if date_range.nil? || (date_range[:from_date].empty? && date_range[:to_date].empty?)

    booking_from = Time.zone.local(*(date_range[:from_date]))
    booking_to = Time.zone.local(*(date_range[:to_date]))

    Room.includes(:images).where("from_date <= ? AND to_date >= ?", booking_from, booking_to)
  end

end
