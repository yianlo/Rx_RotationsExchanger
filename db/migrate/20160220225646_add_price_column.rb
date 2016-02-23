class AddPriceColumn < ActiveRecord::Migration
  def change
    add_column :benches, :price, :integer
  end
end
