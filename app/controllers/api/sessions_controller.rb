class Api::SessionsController < ApplicationController
  def new
  end

  def check
    debugger
    if signed_in?
      @user = current_user
    end

    render :create
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    debugger
    if @user
      sign_in(@user)
    end
  end

  def destroy
    sign_out
  end

end
