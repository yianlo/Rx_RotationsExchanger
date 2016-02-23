class Api::RoomsController < ApplicationController
  def index
    # @benches = Bench.all

    # @rooms = Rooms.filter_by_params(params[:params])

    if params[:bounds]
      @rooms = Room.in_bounds(params[:bounds])
    elsif params[:price_range]
      @rooms = Room.in_price_range(params[:price_range])
    end

  end

  def create

  end
end
