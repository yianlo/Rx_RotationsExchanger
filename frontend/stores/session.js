var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var _user = null;
var _loggedIn = false;

var SessionStore = new Store(AppDispatcher);

_toggleLoggedIn = function(){
  if (_loggedIn){
    _loggedIn = false;
  } else {
    _loggedIn = true;
  }
};

_resetUser = function(user){
  _user = user;
  _loggedIn = true;
}

_resetLoggedIn = function(status){
  _loggedIn = status.status;
}

SessionStore.getUser = function(){
  if (_user) { return _user; }
}

SessionStore.getLoggedInStatus = function(){
  if (_loggedIn) { return true; }

  return false;
}

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "LOG_IN_USER":
      _resetUser(payload.user);
      SessionStore.__emitChange();
      break;
    case "UPDATE_SESSSION_STATUS":
      _resetLoggedIn(payload.status);
      SessionStore.__emitChange();
      break;
    case "DELETE_SESSION":
      _resetUser({});
      SessionStore.__emitChange();
      break;
  }
}

module.exports = SessionStore
