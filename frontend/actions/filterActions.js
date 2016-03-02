var AppDispatcher = require('../dispatcher');

FilterActions = {
  sendParamsToFilter: function(params){
    AppDispatcher.dispatch({
      actionType: "FILTER_PARAMS",
      params: params
    });
  },

  sendTypeToFilter: function(typeParams){
    AppDispatcher.dispatch({
      actionType: "FILTER_TYPES",
      typeParams: typeParams
    });
  },

  resetParams: function(){
    AppDispatcher.dispatch({
      actionType: "RESET_PARAMS",
    });
  }
}

module.exports = FilterActions;
