json.extract! @booking, :id, :room_id, :booker_id, :checkout_date, :checkin_date, :message, :status, :room, :updated_at

if !@booking.room.images.empty?
  json.images @booking.room.images, :url
end
