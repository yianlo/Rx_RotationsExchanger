class AddColumnsSeatingBenchTypeLocationType < ActiveRecord::Migration
  def change
    add_column :benches, :seating, :integer
    add_column :benches, :location_type, :string
    add_column :benches, :bench_type, :string
  end
end
