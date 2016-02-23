# == Schema Information
#
# Table name: benches
#
#  id         :integer          not null, primary key
#  title      :text
#  lat        :float
#  lng        :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  img_url    :string
#  price      :integer
#

class Room < ActiveRecord::Base
  validates :title, :lat, :lng, :price, :seating, :bench_type, :location_type, presence: true

  validates :bench_type, inclusion: { in: ["Entire bench", "Shared bench"] }
  validates :location_type, inclusion: { in: ["Private", "Public"] }

  def self.filter_by_params(params)
    self.in_bounds(params[:bounds]) & self.in_bounds(params[:price_range])
  end

  def self.in_bounds(bounds)
    result = where(
      lat: Float(bounds["southWest"]["lat"])...Float(bounds["northEast"]["lat"]),
      lng: Float(bounds["southWest"]["lng"])...Float(bounds["northEast"]["lng"])
    )
    return result
  end

  def self.in_price_range(price_range)
    result = where(price: price_range[0]..price_range[1])
  end
end
