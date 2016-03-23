class Api::BookingsController < ApplicationController
  def create
    params = booking_params
    params[:booker_id] = current_user.id
    params[:status] = "pending"
    params[:checkin_date] = Time.at(booking_params[:checkin_date].to_i)
    params[:checkout_date] =  Time.at(booking_params[:checkout_date].to_i)

    @booking = Booking.create(params)
  end

  def index
    @bookings = current_user.bookings
  end

  def past_trips
    @bookings = current_user.bookings.where("checkout_date < ?", DateTime.now ).includes(room: :images)
    render :index
  end

  def hostings
    @bookings = User.find_by(id: params[:user_id]).rooms.includes(:bookings).map(&:bookings).flatten!
    render :index
  end

  def destroy
    @booking = Booking.find_by(id: booking_params[:id])
    @booking.destroy
  end

  def approve
  end

  def deny
  end


  private

  def booking_params
    params.require(:booking).permit(:id, :checkout_date, :checkin_date, :room_id, :message)
  end
end
