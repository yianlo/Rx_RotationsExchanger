# == Schema Information
#
# Table name: medical_schools
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  lat        :float            not null
#  lng        :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class MedicalSchoolTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
