# RotationsExchanger

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

RotationsExchanger is a web application inspired by AirBnB built using Ruby on Rails
and React.js. RotationsExchanger allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->
- [ ] Search for housing by medical school name
- [ ] Filter search by specific criteria
- [ ] Browse housing available
- [ ] Read description of individual housing post
- [ ] Create an account
- [ ] Log in / Log out
- [ ] Send private message to host/ author of housing post after log in
- [ ] Favorite housing post after log in
- [ ] Browse favorited housing posts
- [ ] Create new housing post after log in
- [ ] Edit housing post after log in

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Room Model, API, Flux Architecture and Router (1 days)

**Objective:** Rooms can be viewed in index

- [ ] create new project
- [ ] create `Room` model
- [ ] seed the database with a small amount of test data
- [ ] jBuilder views for notes
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console
- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each room component, building out the flux loop as needed.
  - [ ] `RoomsIndex`
    - [ ] `RoomsIndexItem`

### Phase 2: Search Filter (1.5 days)

**Objective:** Rooms index views can be filtered with search
- implement the `FilterParams` component, building out the flux loop as needed.
  - [ ] filter by map bounds
  - [ ] filter by miles
  - [ ] filter by price
  - [ ] filter by dates
  - [ ] filter by home type
  - [ ] filter by room type

### Phase 3: Show Room Page (1.5 days)

**Objective:** Browse individual rooms from index
- implement the 'RoomDetails' component and associated components, building out the flux loop as needed
  - [ ] `RoomDetails`
    - [ ] `ImageSlider`
    - [ ] `RoomDetailHeader`
    - [ ] `RoomDetailText`
      - [ ] include 'Contact Host' link
    - [ ] `BookingRequestBox`
- [ ] link back to index
- [ ] add styling to show page

### Phase 4: Contact Host Component (1 day)

**Objective:** Message component pop up when 'Contact Host' Link

- implement the 'ContactHost' component and associated components, building out the flux loop as needed
  - [ ] `ContactHost`
    - [ ] `HostBio`
    - [ ] `MessageForm`
      - [ ] dates field
      - [ ] message field
      - [ ] error message if form empty
      - [ ] cancel button
      - [ ] submit button
- [ ] lands on Show Room page after submit
- [ ] add styling to new form

### Phase 5: New room posting (1 day)

**Objective:** Rooms can be created and updated into database

- [ ] 'Create' API for room (`RoomsController`)
- [ ] setup `APIUtil` to interact with the API
- [ ] setup cloudinary for posting pictures
- [ ] Confirm database updated
- [ ] lands on room show page after creation
- [ ] add styling to new form

### Phase 6: Backend setup and User Authentication (1.5 day)

**Objective:** Functioning rails project with Authentication

- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] Lands on rooms index page after signin
- [ ] Added 'User Profile' link on Nav Bar
- [ ] Added 'Messages' Link on Nav Bar
- [ ] update contact host link to require log in
- [ ] update new room form to require log in
- [ ] add styling to sign in page

### Phase 7: User profile page (1 day)

**Objective:** User can browse profile after log in

- implement the 'Profile' component and associated components, building out the flux loop as needed
  - [ ] `Profile`
    - [ ] `Profile Bio` (side)
    - [ ] `Notifications`
    - [ ] `Messages`
    - [ ] `Your Listings`
- [ ] add styling to profile page

### Phase 8: Styling Cleanup and Seeding (0.5 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)

- [ ] Autofill medical school name
- [ ] User can add favorites/ likes
- [ ] Add average price for area to guide user
- [ ] Add `Map` component to Room Show page at bottom, rectangle around neighborhood
- [ ] Searchable by city (selection of medical schools for autofill)

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
