var React = require('react'),
    ReactDOM = require('react-dom'),

    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,

    SessionStore = require('./stores/session'),

    App = require('./components/App'),

    LandingPage = require('./components/landing/landingPage'),
    Main = require('./components/main'),
    Chat = require('./components/chat/chat'),

    SearchContent = require('./components/searchContent/searchContent'),
    ProfilePage = require('./components/profile/profilePage'),
    AddFormPage = require('./components/addForm/addFormPage'),
    ShowRoomPage = require('./components/showRoom/showPage'),

    EditForm = require('./components/showRoom/editForm'),
    RoomDetails = require('./components/showRoom/roomDetails'),

    PastTrips = require('./components/trips/pastTrips');

var NavBar = require('./components/nav/navBar');
// <Route path="booking" component={BookingForm}/>

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage}/>
    <Route path="message" component={Chat}/>
    <Route path="main" component={Main}>
      <Route path="search" component={SearchContent}/>
      <Route path=":userId/profile" component={ProfilePage}/>
      <Route path=":userId/trips" component={PastTrips}/>
      <Route path="new" component={AddFormPage} />
      <Route path=":roomId" component={ShowRoomPage}>
        <IndexRoute component={RoomDetails} />
        <Route path="edit" component={EditForm} />
      </Route>
    </Route>
  </Route>
)

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render( <Router>{routes}</Router>, content);
})
