# == Schema Information
#
# Table name: images
#
#  id         :integer          not null, primary key
#  url        :string
#  room_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Image < ActiveRecord::Base
  validates :url, presence: true

  belongs_to :room
end
