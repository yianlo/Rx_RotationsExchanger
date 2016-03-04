class CreateBookings < ActiveRecord::Migration
  def change
    create_table :bookings do |t|
      t.integer :room_id
      t.integer :booker_id
      t.datetime :to_date
      t.datetime :from_date
      t.text :message

      t.timestamps null: false
    end
  end
end
