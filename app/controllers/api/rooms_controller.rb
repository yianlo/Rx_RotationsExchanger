class Api::RoomsController < ApplicationController
  def filter
    @rooms = Room.filter_by_params(filter_params)
    render :index
  end

  def index
    @rooms = current_user.rooms.includes(:images)
  end

  def create
    params = room_params

    params[:host_id] = current_user.id
    params[:to_date] = Time.zone.local(room_params[:to_date])
    params[:from_date] =  Time.zone.local(room_params[:from_date])

    @room = Room.create(params)

    render :show
  end

  def show
    @room = Room.find_by(id: room_params[:id])
  end

  def destroy
    @room = Room.find_by(id: params[:id])
    @room.destroy!
  end

  def update
    @room = Room.find_by(id: room_params[:id])
    params = room_params

    params[:host_id] = current_user.id
    params[:to_date] = Time.at(room_params[:to_date].to_i)
    params[:from_date] =  Time.at(room_params[:from_date].to_i)

    @room.update(params)
    render :show
  end

  private

  def room_params
    params.require(:room).permit(
      :id,
      :title,
      :description,
      :lat,
      :lng,
      :price,
      :from_date,
      :to_date,
      :home_type,
      :room_type
    )
  end

  def filter_params
    parsed_filters = JSON.parse( params[:filter], {:symbolize_names => true} )
    new_params = ActionController::Parameters.new({ :filter => parsed_filters})



    new_params.require(:filter)
    # newParams.require(:filter).permit(
    #   :bounds => [:northEast, :southWest],
    #   :price_range,
    #   :home_types,
    #   :room_types,
    #   :date_range => [:northEast, :southWest]
    # )
  end
end
