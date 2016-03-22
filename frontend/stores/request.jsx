var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var RequestStore = new Store(AppDispatcher);

_requests = [];
_pastTrips = [];

_addRequest = function(newRequest){
  _requests.push(newRequest)
};


_resetRequests = function(requests){
  _requests = requests;
};

_resetPastTrips = function(trips){
  _pastTrips = trips;
};

RequestStore.getRequests = function(){
  return _requests.slice();
};

RequestStore.getPastTrips = function(){
  return _pastTrips.slice();
};

RequestStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "REQUEST_RECEIVED":
      _addRequest(payload.request);
      RequestStore.__emitChange();
      break;
    case "USER_REQUESTS_RECEIVED":
      _resetRequests(payload.requests);
      RequestStore.__emitChange();
      break;
    case "USER_PAST_TRIPS_RECEIVED":
      _resetPastTrips(payload.trips);
      RequestStore.__emitChange();
      break;
  }
};



module.exports = RequestStore;
