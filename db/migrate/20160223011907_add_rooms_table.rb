class AddRoomsTable < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :title, null: false
      t.text :description
      t.integer :host_id
      t.float :lat, null: false
      t.float :lng, null: false
      t.string :image_url
      t.integer :price, null: false
      t.datetime :date_from
      t.datetime :date_to
      t.string :home_type
      t.string :room_type

      t.timestamps null: false
    end
  end
end
