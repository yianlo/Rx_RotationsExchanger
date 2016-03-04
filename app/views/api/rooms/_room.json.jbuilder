json.extract! @room, :id, :title, :lat, :lng, :price, :description, :home_type, :room_type, :errors, :host_id

json.from_date @room.from_date.to_i
json.to_date @room.to_date.to_i

if !@room.images.empty?
  json.images @room.images, :url, :id
end
