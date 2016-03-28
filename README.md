# RotationsExchanger

[Live link][rx-rotations-exchanger.herokuapp.com]

## Usage

## Features

### Address search of any and all locations with autocomplete integrated with Google Maps API
![autocomplete_landing]
![autocomplete_nav]
![autocomplete_add_form]

### Dynamic search filtering and display updates
![index_filter]

### All photos and rooms in vivid displays in slider or grid view
![show_slider] ![show_grid]

### Complete single page application with authentication and instant user feedback for input errors for ease of use
![error_sign_up] ![add_form_feedback]

### Easy management of account details
####Listings
![listings]
####Requests
####Trips



[add_form_feedback]: ./screenshots/add_form_feedback.png
[error_sign_up]: ./screenshots/error_sign_up.png
[search_filter]: ./screenshots/search_filter.png
[index_filter]: ./screenshots/index_filter.png
[autocomplete_add_form]: ./screenshots/autocomplete_add_form.png
[autocomplete_nav]: ./screenshots/autocomplete_nav.png
[autocomplete_landing]: ./screenshots/autocomplete_landing.png
[single_page_auth]: ./screenshots/single_page_auth.png
[show_grid]: ./screenshots/show_grid.png
[show_slider]: ./screenshots/show_slider.png


## Todos

## Future Features

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

- [x] create new project
- [x] create `Room` model
- [x] seed the database with a small amount of test data
- [ ] jBuilder views for rooms
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console
- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement each room component, building out the flux loop as needed.
  - [x] `RoomsIndex`
    - [x] `RoomsIndexItem`

### Phase 2: Search Filter (1.5 days)

**Objective:** Rooms index views can be filtered with search
- implement the `FilterParams` component, building out the flux loop as needed.
  - [x] filter by map bounds
  - [ ] filter by miles
  - [x] filter by price
  - [x] filter by dates
  - [x] filter by home type
  - [x] filter by room type

  ### Phase 6: Backend setup and User Authentication (1.5 day)

  **Objective:** Functioning rails project with Authentication

  - [x] create `User` model
  - [x] authentication
  - [x] user signup/signin pages
  - [x] Lands on rooms index page after signin
  - [ ] Added 'User Profile' link on Nav Bar
  - [ ] update contact host link to require log in
  - [ ] update new room form to require log in
  - [x] add styling to sign in page

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

- [x] 'Create' API for room (`RoomsController`)
- [x] setup `APIUtil` to interact with the API
- [x] setup cloudinary for posting pictures
- [x] Confirm database updated
- [ ] lands on room show page after creation
- [ ] handles and renders appropriate errors if failed
- [x] add styling to new form

### Phase 6: User profile page (1 day)

**Objective:** User can browse profile after log in

- implement the 'Profile' component and associated components, building out the flux loop as needed
  - [ ] `Profile`
    - [ ] `Profile Bio` (side)
    - [ ] `Notifications`
    - [ ] `Messages`
    - [ ] `Your Listings`
- [ ] add styling to profile page

### Phase 7: Styling Cleanup and Seeding (0.5 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Remove all warnings
- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)

- [ ] show photos right after adding
- [ ] refactor store from array to objects
- [ ] make images model
- [ ] change date objects
- [ ] nice loading pages
- [ ] handle empty fields in new form nicely
- [ ] improve add photo api
- [ ] customize 404 page
- [ ] add pretty symbols to every button
- [ ] make authform not get values by index
- [ ] Refactor auth component and store for session https://github.com/reactjs/react-router/blob/master/examples/auth-flow/auth.js
- [ ] Autofill medical school name
- [ ] Messaging
- [ ] User can add favorites/ likes
- [ ] Add average price for area to guide user
- [ ] Add `Map` component to Room Show page at bottom, rectangle around neighborhood
- [ ] Searchable by city (selection of medical schools for autofill)

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
