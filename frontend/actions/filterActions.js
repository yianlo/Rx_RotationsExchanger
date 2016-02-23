var AppDispatcher = require('../dispatcher');

FilterActions = {
  sendParamsToFilter: function(params){
    AppDispatcher.dispatch({
      actionType: "FILTER_PARAMS",
      params: params
    });
  }
}

module.exports = FilterActions;
