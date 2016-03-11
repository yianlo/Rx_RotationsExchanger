var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var RequestStore = new Store(AppDispatcher);

_requests = [];

_addRequest = function(newRequest){
  _requests.push(newRequest)
};


_resetRequests = function(requests){
  _requests = requests;
}

RequestStore.getRequests = function(){
  return _requests.slice();
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
  }
};



module.exports = RequestStore;
