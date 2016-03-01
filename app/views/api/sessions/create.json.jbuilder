if @user
  json.extract! @user, :email, :rooms
end
