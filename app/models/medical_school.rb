class MedicalSchool < ActiveRecord::Base
  validates :name, :lat, :lng, presence: true

  belongs_to :students,
    class_name: "User"
end
