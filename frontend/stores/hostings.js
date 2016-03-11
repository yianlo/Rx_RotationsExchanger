var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var HostingsStore = new Store(AppDispatcher);

_hostings = [];

_resetHostings = function(hostings){
  _hostings = hostings;
}

HostingsStore.getHostings = function(){
  return _hostings.slice();
};

HostingsStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "USER_HOSTINGS_RECEIVED":
      _resetHostings(payload.hostings);
      HostingsStore.__emitChange();
      break;
  }
};



module.exports = HostingsStore;
