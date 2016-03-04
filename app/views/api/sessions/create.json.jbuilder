if @user
  json.extract! @user, :id, :email, :rooms
end
