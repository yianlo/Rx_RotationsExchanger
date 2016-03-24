var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var HostingsStore = new Store(AppDispatcher);

_allHostings = {};
_pending = {};
_approved = {};
_denied = {};

_resetHostings = function(hostings){

  for (var i = 0; i < hostings.length; i++) {
    hostings[i].checkin_date = new Date(hostings[i].checkin_date);
    hostings[i].checkout_date = new Date(hostings[i].checkout_date);

    if (hostings[i].status === "pending") {
      _pending[hostings[i].id] = hostings[i]
    } else if (hostings[i].status === "approved"){
      _approved[hostings[i].id] = hostings[i]
    } else if (hostings[i].status === "denied"){
      _denied[hostings[i].id] = hostings[i]
    }

    _allHostings[hostings[i].id] = hostings[i]
  }
}

_updateHosting = function(hostingReq){
  hostingReq.checkin_date = new Date(hostingReq.checkin_date);
  hostingReq.checkout_date = new Date(hostingReq.checkout_date);

  _allHostings[hostingReq.id] = hostingReq;
  delete _pending[hostingReq.id];

  if( hostingReq.status === "approved" ){
    _approved[hostingReq.id] = hostingReq;
  } else if ( hostingReq.status === "denied" ){
    _denied[hostingReq.id] = hostingReq;
  }
}

_objToArray = function(obj){
  return Object.keys(obj).map(function(reqId){return obj[reqId]})
};

HostingsStore.getHostings = function(){
  return _allHostings.slice();
};

HostingsStore.getApproved = function(){
  return _objToArray(_approved);
};

HostingsStore.getDenied = function(){
  return _objToArray(_denied);
};

HostingsStore.getPending = function(){
  return _objToArray(_pending);
};

HostingsStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "USER_HOSTINGS_RECEIVED":
      _resetHostings(payload.hostings);
      HostingsStore.__emitChange();
      break;
    case "SINGLE_HOSTING_REQ_RECEIVED":
      _updateHosting(payload.hostingReq);
      HostingsStore.__emitChange();
      break;
  }
};

module.exports = HostingsStore;
