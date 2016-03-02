if @rooms
  json.rooms @rooms do |room|
    json.id room.id
    json.title json.title
    json.lat room.lat
    json.lng room.lng
    json.price room.price
    json.description room.description
    json.home_type room.home_type
    json.from_date room.from_date.to_i
    json.to_date room.to_date.to_i
    json.to_date room.to_date

    if !room.images.empty?
      json.images room.images, :url
    end
  end
end
