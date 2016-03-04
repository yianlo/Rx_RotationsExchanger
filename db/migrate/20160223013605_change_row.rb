class ChangeRow < ActiveRecord::Migration
  def change
    rename_column :rooms, :image_url, :img_url
  end
end
