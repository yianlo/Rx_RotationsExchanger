json.extract! @room, :id, :title, :lat, :lng, :price, :description, :home_type, :room_type, :from_date, :to_date, :errors

if !@room.images.empty?
  json.images @room.images, :url
end
