if @rooms
  json.rooms @rooms do |room|
    json.id room.id
    json.title json.title
    json.lat room.lat
    json.lng room.lng
    json.price room.price
    json.description room.description
    json.home_type room.home_type
    json.room_type room.room_type
    json.from_date room.from_date
    json.to_date room.to_date

    if !room.images.empty?
      json.images room.images, :url
    end
  end
end
