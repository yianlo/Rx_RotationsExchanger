if @rooms
  json.array! @rooms do |room|
    json.id room.id
    json.host_id room.host_id
    json.title room.title
    json.lat room.lat
    json.lng room.lng
    json.price room.price
    json.description room.description
    json.home_type room.home_type
    json.from_date room.from_date.to_i
    json.to_date room.to_date.to_i

    if !room.images.empty?
      json.images room.images, :url, :id
    end
  end
end
