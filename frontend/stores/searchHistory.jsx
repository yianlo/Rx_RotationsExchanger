var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var SearchHistoryStore = new Store(AppDispatcher);

SearchHistoryStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "RENDER_AUTH_ERROR":
      _updateAuthErrors(payload.error);
      SearchHistoryStore.__emitChange();
      break;
    case "RENDER_ROOM_ERROR":
      _updateRoomErrors(payload.error);
      SearchHistoryStore.__emitChange();
      break;
  }
};



module.exports = SearchHistoryStore;
