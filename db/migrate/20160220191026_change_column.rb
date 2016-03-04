class ChangeColumn < ActiveRecord::Migration
  def change
    rename_column :benches, :description, :title
  end
end
