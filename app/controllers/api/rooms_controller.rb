class Api::RoomsController < ApplicationController

  def first_three
    @rooms = Room.all.includes(:images).take(3)
    render :index
  end

  def filter
    @rooms = Room.filter_by_params(params[:filter])
    # @rooms = Room.filter_by_params(params[:filter]).inclues(:images)
    render :index
  end

  def index
    @rooms = current_user.rooms.includes(:images)
  end

  def create
    params = room_params

    params[:host_id] = current_user.id
    params[:to_date] = Time.at(room_params[:to_date].to_i)
    params[:from_date] =  Time.at(room_params[:from_date].to_i)

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

  # def filter_params
  #   parsed_filters = JSON.parse( params[:filter], {:symbolize_names => true} )
  #   new_params = ActionController::Parameters.new({ :filter => parsed_filters})
  #
  #   params.require(:filter)
  #
  #   # params.require(:filter).permit(
  #   #   :bounds => [ {northEast: [:lat, :lng]}, {southWest: [:lat, :lng]} ],
  #   #   :price_range,
  #   #   :home_types,
  #   #   :room_types,
  #   #   :to_date,
  #   #   :from_date
  #   # )
  # end
end
