class Api::UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)

    if @user.errors.full_messages.empty?
      sign_in(@user)
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :email)
  end
end
