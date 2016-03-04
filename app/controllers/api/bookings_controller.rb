class Api::BookingsController < ApplicationController
  def create
    params = booking_params
    params[:booker_id] = current_user.id

    @booking = Booking.create(params)
  end

  def destroy
  end

  def show
  end

  def update
  end


  private

  def booking_params
    params.require(:booking).permit(:to_date, :from_date, :room_id)
  end
end
