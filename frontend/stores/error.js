var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var errorStore = new Store(AppDispatcher);

_authErrors = [];
_roomErrors = [];

errorStore.getAuthErrors = function(){
  var errors = _authErrors.slice()
  _authErrors = [];

  return errors
};

errorStore.getRoomErrors = function(){
  var errors = _roomErrors.slice()
  _roomErrors = [];

  return errors
};

_flatten = function(ary) {
  var ret = [];
  for(var i = 0; i < ary.length; i++) {
    if(Array.isArray(ary[i])) {
      ret = ret.concat(_flatten(ary[i]));
    } else {
      ret.push(ary[i]);
    }
  }
  return ret;
};

_updateErrors = function(fetchedError){
  if (typeof fetchedError === "string"){
    var _errorObj = [fetchedError];
  } else if (typeof fetchedError === "object"){
    var fetchedErrors = Object.keys(fetchedError).map(function(key){
      return fetchedError[key].map(function(error){
        key = key.replace(/_/, " ")
        return key.charAt(0).toUpperCase() + key.slice(1) + " " + error;
      });
    });
    var _errorObj = _flatten(fetchedErrors);
  }

  return _errorObj
};

_updateAuthErrors = function(error){
  _authErrors = _updateErrors(error)
};

_updateRoomErrors = function(error){
  _roomErrors = _updateErrors(error)
};

errorStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "RENDER_AUTH_ERROR":
      _updateAuthErrors(payload.error);
      errorStore.__emitChange();
      break;
    case "RENDER_ROOM_ERROR":
      _updateRoomErrors(payload.error);
      errorStore.__emitChange();
      break;
  }
};



module.exports = errorStore;
