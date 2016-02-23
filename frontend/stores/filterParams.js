var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var _params:{ bounds: {}, price_range: [] };
var filterParamsStore = new Store(AppDispatcher);

var _updateParams = function(newParams){
  Object.keys(newParams).forEach( fucntion(key){
    _params[key] = newParams[key];
  } )
}

filterParamsStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "FILTER_PARAMS":
      _updateParams(payload.params);
      RoomStore.__emitChange();
      break;
  }
}




module.exports = filterParamsStore
