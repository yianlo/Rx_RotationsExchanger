class AddColumnToBooking < ActiveRecord::Migration
  def change
    add_column :bookings, :status, :string, default: "pending"
  end
end
