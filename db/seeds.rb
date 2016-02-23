# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

COORDS = [[37.7831378, -122.4817236], [37.7529817,-122.4710821], [37.7390772,-122.48699804], [37.7694515,-122.4597928]]
TITLES = [
  "Lovebird Bench with Wonderful View",
  "THE Dog Bench",
  "Beautiful Weaved Bench of Comfort",
  "Glowing Bench Centrally Located near Garbage"
]

IMG_URLS = [
  "http://img05.deviantart.net/8238/i/2011/172/5/1/bench_by_barnulf-d3jhk5u.jpg",
  "http://static1.1.sqspcdn.com/static/f/493749/16374920/1328191017547/AdamsArtsAntiques_102032012.jpg?token=far5qJlJDd8nhA%2F5v%2BOzezq%2Fe3A%3D",
  "http://housetodecor.com/wp-content/uploads/2014/05/jute-woven-bench.jpg",
  "http://cache1.asset-cache.net/xc/491224332.jpg?v=2&c=IWSAsset&k=2&d=AfYvBRfpS7DRLEHZOkUVIoidrngvjNC03DLJlfaMFTU2lMTDTUzn9c97loBRoIwj0"
]

BENCH_TYPE = ["Entire bench", "Shared bench"]
LOCATION_TYPE = ["Private", "Public"]

(0...COORDS.length).to_a.each do |i|
  Bench.create(
    title: TITLES[i],
    lat: COORDS[i][0],
    lng: COORDS[i][1],
    price: Faker::Number.between(10, 150),
    seating: Faker::Number.between(1, 5),
    bench_type: BENCH_TYPE.sample,
    location_type: LOCATION_TYPE.sample,
    img_url: IMG_URLS[i]
    )
end
