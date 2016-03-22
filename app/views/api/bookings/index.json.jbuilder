# json.array! @bookings, :checkout_date, :checkin_date, :message, :status, :room, :booker

json.array! @bookings do |booking|
  json.checkout_date booking.checkout_date
  json.checkout_date booking.checkout_date
  json.message booking.message
  json.status booking.status
  json.booker booking.booker
  json.room booking.room

  json.images booking.room.images, :url
end
