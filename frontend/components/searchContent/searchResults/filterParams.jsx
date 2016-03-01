var React = require('react'),
    FilterParamsStore = require('../../../stores/filterParams'),
    apiUtil = require('../../../util/apiUtil'),
    FilterActions = require('../../../actions/filterActions');

var FilterParams = React.createClass({
  getInitialState: function(){
    return { params: {} }
  },

  _onChange: function(){
    // debugger

    var params = FilterParamsStore.getParams();
    // if (params.bounds && this.state.params !== params){
      apiUtil.fetchRoomsWithinParams(params);
      this.setState( { params: params } );
    // }
  },

  componentDidMount: function(){
    this.listenerToker = FilterParamsStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    // FilterActions.resetParams();
    this.listenerToker.remove();
  },

  render: function(){
    return (
      <div></div>
    )
  }
});

module.exports = FilterParams;