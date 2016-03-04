class Addcolumn < ActiveRecord::Migration
  def change
    add_column :benches, :img_url, :string
  end
end
