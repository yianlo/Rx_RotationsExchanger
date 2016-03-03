class Api::ImagesController < ApplicationController
  def create
    images_params[:img_urls].each do |url|
      Image.create(url: url, room_id: images_params[:room_id])
    end
  end

  def destroy
    image = Image.find_by(id: image_params[:id])

    if image
      image.destroy
      @room = image.room
    end
  end


  private

  def images_params
    parsed_urls = JSON.parse( params[:images], {:symbolize_names => true} )
    new_params = ActionController::Parameters.new({:images => parsed_urls})

    new_params.require(:images)
    # new_params.require(:images).permit(:img_urls, :room_id)
  end

  def image_params
    params.require(:image).permit(:id)
  end

end
