class ChangeUsersColumn < ActiveRecord::Migration
  def change
    change_column_null :users, :medical_school_id, true
  end
end
