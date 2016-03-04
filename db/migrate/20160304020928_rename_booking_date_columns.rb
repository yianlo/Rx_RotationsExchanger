class RenameBookingDateColumns < ActiveRecord::Migration
  def change
    rename_column :bookings, :to_date, :checkout_date
    rename_column :bookings, :from_date, :checkin_date
  end

end
