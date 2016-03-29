var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var RequestStore = new Store(AppDispatcher);

_allTrips = {};
_pastTrips = {};
_currentTrips = {};
_upcomingTrips = {};

_addRequest = function(newRequest){
  _allTrips[newRequest.id] = newRequest;
};

_resetRequests = function(){
  _allTrips = {};
  _pastTrips = {};
  _currentTrips = {};
  _upcomingTrips = {};
};

_addNewRequests = function(requests){
  _resetRequests();

  today = new Date;

  for (var i = 0; i < requests.length; i++) {
    requests[i].checkin_date = new Date(requests[i].checkin_date);
    requests[i].checkout_date = new Date(requests[i].checkout_date);

    if (requests[i].checkin_date > today) {
      _upcomingTrips[requests[i].id] = requests[i];
    } else if (requests[i].checkout_date < today) {
      _pastTrips[requests[i].id] = requests[i];
    } else {
      _currentTrips[requests[i].id] = requests[i];
    }

    _allTrips[requests[i].id] = requests[i];
  }
};

_deleteTrip = function(tripId){
  delete _allTrips[tripId];

  if(_pastTrips[tripId]){ delete _pastTrips[tripId]; }
  if(_currentTrips[tripId]){ delete _currentTrips[tripId]; }
  if(_upcomingTrips[tripId]){ delete _upcomingTrips[tripId]; }
};

_resetPastTrips = function(trips){
  _pastTrips = trips;
};

_objToArray = function(obj){
  return Object.keys(obj).map(function(reqId){return obj[reqId]})
};

RequestStore.getAllRequests = function(){
  return _allTrips;
};

RequestStore.getPastTrips = function(){
  return _objToArray(_pastTrips);
};

RequestStore.getCurrentTrips = function(){
  return _objToArray(_currentTrips);
};

RequestStore.getUpcomingTrips = function(){
  return _objToArray(_upcomingTrips);
};

RequestStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "REQUEST_RECEIVED":
      _addRequest(payload.request);
      RequestStore.__emitChange();
      break;
    case "USER_REQUESTS_RECEIVED":
      _addNewRequests(payload.requests);
      RequestStore.__emitChange();
      break;
    case "USER_PAST_TRIPS_RECEIVED":
      _resetPastTrips(payload.trips);
      RequestStore.__emitChange();
      break;
    case "DELETE_TRIP":
      _deleteTrip(payload.tripId);
      RequestStore.__emitChange();
      break;
  }
};



module.exports = RequestStore;
