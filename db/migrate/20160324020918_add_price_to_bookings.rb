class AddPriceToBookings < ActiveRecord::Migration
  def change
    add_column :bookings, :price, :integer
    remove_column :rooms, :img_url
  end
end
