var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');

var _params = {
  bounds: null,
  price_range: [0, 501],
  home_types: [],
  room_types: [],
  date_range: { from_date: [], to_date: [] }
};

var filterParamsStore = new Store(AppDispatcher);

var _updateParams = function(newParams){
  Object.keys(newParams).forEach( function(key){
    _params[key] = newParams[key];
  } );
};

var _updateTypeParam = function(typeParams){
  var typeCategory = typeParams.typeCategory,
      typeValue = typeParams.typeValue,
      index = _params[typeCategory].indexOf(typeValue);

  if (typeParams.checked) {
    _params[typeCategory].push(typeValue);
  } else if (!typeParams.checked && index > -1){
    _params[typeCategory].splice(index, 1);
  }
};

_resetParams = function(){
  _params = {
    bounds: _params.bounds,
    price_range: [0, 501],
    home_types: [],
    room_types: [],
    date_range: { from_date: [], to_date: [] }
  }
};

filterParamsStore.getParams = function(){
  return _params;
};

filterParamsStore.__onDispatch = function (payload) {

  switch(payload.actionType) {
    case "FILTER_PARAMS":
      _updateParams(payload.params);
      filterParamsStore.__emitChange();
      break;
    case "FILTER_TYPES":
      _updateTypeParam(payload.typeParams);
      filterParamsStore.__emitChange();
      break;
    case "RESET_PARAMS":
      _resetParams();
      filterParamsStore.__emitChange();
      break;
  }
}

module.exports = filterParamsStore;
