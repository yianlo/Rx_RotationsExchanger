# json.array! @bookings, :checkout_date, :checkin_date, :message, :status, :room, :booker

json.array! @bookings do |booking|
  json.id booking.id
  json.checkout_date booking.checkout_date
  json.checkin_date booking.checkin_date
  json.message booking.message
  json.status booking.status
  json.booker booking.booker
  json.room booking.room
  json.updated_at booking.updated_at
  json.total_price booking.total_price

  json.images booking.room.images, :url
end
