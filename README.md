# RotationsExchanger
[Live link](rx-rotations-exchanger.herokuapp.com)

RotationsExchanger is a web application designed for medical students to easily list and search for homes while on away clinical rotations. This full stack application is completed with Ruby on Rails and React.js. Inspiration for the application comes from [AirBnB](airbnb.com) and [RotatingRoom](RotatingRoom.com).

## Application Features

### Address search of any locations with autocomplete integrated with Google Maps API
![autocomplete_landing]
![autocomplete_nav]
![autocomplete_add_form]

### Dynamic search filtering with compounded parameters and display updates
![index_filter]

### Vivid display of all photos and rooms in both slider and grid views
![show_slider] ![show_grid]

### Complete single page application with authentication and instant user feedback for input errors and improved ease of use
![error_sign_up] ![add_form_feedback]

### Management made easy for all account details
####Listings
![listings]
####Requests
View all requests dynamicall organized by status.
![requests_approved_denied]

Easily view guest messages and approve or deny requests.
![requests_pending]

####Trips
![trips]

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
[trips]: ./screenshots/trips.png
[requests_approved_denied]: ./screenshots/requests_approved_denied.png
[requests_pending]: ./screenshots/requests_pending.png
[listings]: ./screenshots/listings.png

## Technical Features

###Stack
* Ruby on Rails
* React.js
* Postgresql

###Models Schema
* Users
* Rooms
* Images
* Bookings

###APIs
* Google Maps API
* Cloudinary API
* Pusher Websocket API

###Modularized Components
React components are abstracted and grouped by logical similarity. This enables improved code maintainability and allows easy iterative design and development.

###Data Integrity
Integrated with React, the flux architecture provides real time reflection of all needed data from the database, allowing dynamic updates and minimal server requests.

## Todos
* refactor DateTime to single method in app context to improve code maintainability
* refactor index view for booking to use show partial
* set up browsing history in localStorage

## Future Features
* **Messaging model:** complete message history between guest and host for improved ease in trips/ request management
* **Availability model:** multiple date ranges for each listing's available dates, allowing user to list with more flexibility
* **Favorites model:** save listings for future trips


[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md
