require 'pusher'

Pusher.app_id = 184752
Pusher.key = "168f0f98f67a3b21c223"
Pusher.secret = "a54ad2514e444254433f"

class Api::MessagesController < ApplicationController
  def create

    Pusher.trigger('messages', 'new_message', {
      'text': message_params[:text],
      'username': message_params[:username],
      'time': message_params[:time]
    })
  end

  private

  def message_params
    params.require(:message).permit(:text, :username, :time)
  end
end
