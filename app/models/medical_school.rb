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

class MedicalSchool < ActiveRecord::Base
  validates :name, :lat, :lng, presence: true

  belongs_to :students,
    class_name: "User"
end
