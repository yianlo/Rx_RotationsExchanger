class CreateMedicalSchools < ActiveRecord::Migration
  def change
    create_table :medical_schools do |t|
      t.string :name, null: false
      t.float :lat, null: false
      t.float :lng, null: false

      t.timestamps null: false
    end
  end
end
