class RenameTable < ActiveRecord::Migration
  def change
    rename_table :benches, :rooms
  end
end
