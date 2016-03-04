# == Schema Information
#
# Table name: benches
#
#  id         :integer          not null, primary key
#  title      :text
#  lat        :float
#  lng        :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  img_url    :string
#  price      :integer
#

require 'test_helper'

class BenchTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
