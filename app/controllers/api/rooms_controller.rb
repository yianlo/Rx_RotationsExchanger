class Api::RoomsController < ApplicationController
  def index
    @rooms = Room.filter_by_params(filter_params)
  end

  def create
    params = room_params

    params[:host_id] = current_user.id
    params[:to_date] = Time.zone.local(*(JSON.parse room_params[:to_date])) if !(JSON.parse room_params[:to_date]).empty?
    params[:from_date] = Time.zone.local(*(JSON.parse room_params[:from_date])) if !(JSON.parse room_params[:to_date]).empty?

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

    debugger

    params = room_params
    params[:to_date] = Time.zone.local(*(JSON.parse room_params[:to_date])) if !(JSON.parse room_params[:to_date]).empty?
    params[:from_date] = Time.zone.local(*(JSON.parse room_params[:from_date])) if !(JSON.parse room_params[:to_date]).empty?

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
    #   :bounds,
    #   :price_range,
    #   :home_types,
    #   :room_types,
    #   :date_range
    # )
  end
end
