class ChangeUsersTable < ActiveRecord::Migration
  def change
    add_column :users, :medical_school_id, :integer, null: false
  end
end
