# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

LATLNG = [37.773972, -122.431297];

TITLES = [
  "Central Location Next to UCSF",
  "Comfy Couch in Shabby Chic",
  "The White Bed",
  "Retro Room near Haight Ashbury",
  "San Francisco City Bed",
  "Playful Room in SF",
  "Cozy Room in Bay Area",
  "Spacious Modern Loft",
  "Modern View Flat",
  "Beautiful Garden Room",
  "Cute Room for Two",
  "Decked out Attic"
]

IMG_URLS = [
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://blog.gessato.com/wp-content/uploads/2012/06/top-room-portraits-menno-aden-photographer-gessato-gblog-3.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/https://kellieanne.files.wordpress.com/2011/06/hgtv-emily-teal-couch.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://www.wallcoo.net/photography/home_space_01/images/Interior_Photography_GK032.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://s3.favim.com/orig/46/bed-bedroom-interior-light-photography-Favim.com-412357.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://jeffrobertsimaging.com/wp-content/uploads/2013/03/Maine-Kitchen-Photography-Jeff-Roberts-Imaging.jpg",
  "http://www.hegeinfrance.com/wp-content/uploads/2015/06/airbnb-copenhagen-apartment-living-room.jpg",
  "https://38.media.tumblr.com/ca653731194b2b6a4c53f2db385a2885/tumblr_inline_nl4uyeOImI1tq27qp.png",
  "http://www3.pictures.lonny.com/mp/DwqA1QSCnmGx.jpg",
  "https://33.media.tumblr.com/tumblr_m16nnb4VMr1qkkadg.jpg",
  "http://www.houseandgarden.pw/wp-content/uploads/2016/03/best-design-vintage-white-bedroom-tumblr-white-christmas-bedroom-beach-decor.jpg",
  "http://stephniepalma.com/wp-content/uploads/2015/11/tumblr-bedrooms-blue-714x600.jpg",
  "http://media.tumblr.com/tumblr_mf65u9si7P1qcfl10.jpg"
];

MORE_IMGS = [
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/https://www.asid.org/sites/default/files/kitchen%20design_0.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://smdphotography.co.uk/wp-content/uploads/2013/04/plug_kitchen_swith_lane_lores-0012.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://cdn.decoist.com/wp-content/uploads/2015/04/Track-lighting-adds-beauty-to-the-cozy-window-seat.jpg",
  "http://wallpaperspics.com/thumbs/26/e/warm-living-room-couch-white-264670.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://cdn.home-designing.com/wp-content/uploads/2010/04/gorgeous-living-room.jpg",
  "http://st.hzcdn.com/simgs/83f1a2b5018bbd8d_4-9046/contemporary-living-room.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://static1.squarespace.com/static/52e12a98e4b0bd0cf79bddf1/t/53dfc1a5e4b09cae351e8593/1407173074802/beautiful-white-bathroom-interior-bathtub-and-shower-with-backsplash-.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://www.completelylondon.co.uk/wp-content/uploads/2012/04/Completely-London-11497.jpg",
  "http://st.hzcdn.com/simgs/8ec1eb170d24fb60_4-3066/eclectic-bathroom.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://www.newbornphotography.com/i/admin/CW1A5399-1.jpg",
  "http://st.hzcdn.com/simgs/96a10d8f00b6ae68_4-2875/eclectic-home-office.jpg",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://static1.squarespace.com/static/5537dd3ce4b0a7660df34746/55f41054e4b01ca71c0e1d86/55f4145be4b0a2423b5bce18/1442059356304/Home-staging-photography-2.jpg",
  "http://static1.squarespace.com/static/54656fd2e4b00540a6d8067f/5465708ee4b072133bf2823d/5500fd15e4b03037fd13d168/1426128153873/2416Hawthrn-111.jpg?format=750w",
  "https://res.cloudinary.com/dcnac6iuq/image/fetch/http://www.nataliechampajennings.com/wp-content/uploads/2016/01/15-16916-post/001-Eden-Prairie-Minnesota-family-photography-at-home-1024x683(pp_w900_h600).jpg",
  "http://static.tumblr.com/44e9b1cfcbb5e74b0c870f242ddee196/ugalfcd/1qxmpyow2/tumblr_static_cute.jpg",
  "https://s-media-cache-ak0.pinimg.com/736x/14/ce/2b/14ce2bbf888f301e68203d21899fa3ca.jpg",
  "http://i.ebayimg.com/00/s/NDI3WDgwMA==/z/rswAAOSwcu5UPklE/$_32.JPG",
  "https://secure.static.tumblr.com/d72ec67b838ddc5338e9ce13e3f54873/94ubkdt/XWSnzml36/tumblr_static_tumblr_static_ajhicbpjmsgkkow0ww8cwg0wg_640.jpg",
  "http://41.media.tumblr.com/325f1ea1e0861ab4b8be1cf6e6299aeb/tumblr_n0rtvxlMw31troo73o1_1280.jpg",
  "http://36.media.tumblr.com/68ce95ab2b8a4adf889919116c7803d5/tumblr_n81pl1ocUk1rv56l6o4_500.jpg",
  "https://41.media.tumblr.com/e77d8c67c517910ee0dbbb145f2bd6b5/tumblr_nrag1zsseJ1rz4wo0o1_500.jpg",
  "https://41.media.tumblr.com/a0e16c97e711289344128148988cf09b/tumblr_nncwwv9vr91u6dkido1_500.jpg",
  "https://secure.static.tumblr.com/508f0bb43b41a11bb1df349e5de77378/qojzghb/CVynzrj79/tumblr_static_tumblr_static_cwei2surijso0ococ44sk8g4s_640.jpg",
  "http://s1.favim.com/610/150324/lights-purple-room-tumblr-room-Favim.com-2591010.jpg"
];

HOME_TYPE = ["House", "Apt/ Condo", "Studio"]
ROOM_TYPE = ["Private room", "Public room"]

DESCRIPTIONS = [
  "Gorgeous private Master BR, BA in sunlight-soaked modern apartment (blackout curtains included). At the meeting point of Hayes Valley, The Mission, Lower Haight, Castro, and SoMa, you're in the middle of the best SF has to offer!",
  "Beautiful street with historic SF Victorians. I live upstairs in the main house and rent the 1bd/1ba in-law unit downstairs. Unit has separate entrance and full kitchen. Awesome yard with trees, deck, and gas fireplace.",
  "Your lovely room is fitted with a Comfy Memory Foam Murphy Bed that folds up; transforming the room into a spacious living room with a leather couch and views of the city street below.",
  "Spectacular room in beautiful large apt—includes your very own private bathroom and large private deck with great views. Hood is quiet with hip bars and notable restaurants.",
  "Large 1 bedroom with LOTs of light right on 18th St off Mission St - phenomenal location. Lots of records and books in our artsy apartment.",
  "Charming guest suite with a private entrance on a leafy and quiet block in the Inner Richmond District. Located 2 between Golden Gate Park and The Presidio, this is a perfect lodging for singles or couples. Convenient to many bus routes.",
  "This one bedroom with private bath at the rear of a 1925 two-story home has a separate keyed entrance right off the deck. Welcome beer or glass of wine, if you'd like. Nicer continental breakfast :). Beach, park, buses very close.",
  "The building is brand new and in the perfect location! At the intersection of the Mission, Hayes Valley, and Lower Haight. Right in the heart of authentic SF :)",
  "Gorgeous and sunny condo in Noe Valley. Beautiful views of the city. Gourmet kitchen, terrace w barbecue grill.",
  "I have a spare bedroom in my beach cottage with it's own half bath (shower only). The room is cozy and private with access to the living room, kitchen and front porch.",
  "Located in the highly desirable Noe Valley neighborhood, this cozy room is private with a separate entry & a small en suite full bathroom. Walking distance to restaurants, markets, bars, cafes, South Bay shuttle stops, and public transportation.",
  "A great view in a friendly household. A new desk, bed, and a giant walk in closet. The paint job and furniture are brand new. Hardwood floor + a new rug. Netflix, commercial free Hulu, and Amazon prime for your TV + chromecast."
]

User.create(email: "test1@gmail.com", password: "password1")
User.create(email: "test@gmail.com", password: "password")
User.create(email: "test2@gmail.com", password: "password2")
User.create(email: "test3@gmail.com", password: "password3")

(0...TITLES.length).to_a.each do |i|
  Room.create(
    title: TITLES[i],
    description: DESCRIPTIONS[i],
    lat: LATLNG[0] + Faker::Number.between(-0.05, 0.03),
    lng: LATLNG[1] + Faker::Number.between(-0.05, 0.03),
    price: Faker::Number.between(10, 150),
    home_type: HOME_TYPE.sample,
    room_type: ROOM_TYPE.sample,
    from_date: Faker::Date.between(Date.today, 4.days.from_now),
    to_date: Faker::Date.between(20.days.from_now, 30.days.from_now),
    host_id: i % 3 + 1
  )

  past = Faker::Date.between(20.days.ago, 11.days.ago)
  upcoming = Faker::Date.between(1.days.from_now, 10.days.from_now)
  checkin = [past, upcoming].sample

  Booking.create(
    room_id: i + 1,
    booker_id: i % 3 + 2,
    checkin_date: checkin,
    checkout_date: checkin + Faker::Number.between(2, 10),
    message: "Hello! I would love to stay at your place at these dates during my rotation :)",
    status: %w(pending approved denied).sample
  )
end

(0...IMG_URLS.length).to_a.each do |i|
  Image.create(
    url: IMG_URLS[i],
    room_id: i + 1
  )
end

MORE_IMGS.each do |img|
  Image.create(
    url: img,
    room_id: Faker::Number.between(1, 12)
  )
end
