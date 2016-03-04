class ChangeDatesColumnNames < ActiveRecord::Migration
  def change
    rename_column :rooms, :date_from, :from_date
    rename_column :rooms, :date_to, :to_date
  end
end
