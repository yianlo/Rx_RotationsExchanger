json.extract! @booking, :id, :checkout_date, :checkin_date, :message, :status, :room, :booker, :updated_at, :total_price

if !@booking.room.images.empty?
  json.images @booking.room.images, :url
end
