var React = require('react'),
    SearchFields = require('./searchFields/searchFields'),
    Index = require('./searchResults/index'),

    FilterParams = require('./searchResults/FilterParams'),
    FilterParamsStore = require('../../stores/filterParams'),
    RoomStore = require('../../stores/room'),

    NavBar = require('../nav/navBar');

var SearchContent = React.createClass({
  contextTypes: {
    showMap: React.PropTypes.func,
    hideMap: React.PropTypes.func,
    map: React.PropTypes.object,
    bounds:  React.PropTypes.string
  },

  getInitialState: function(){
    return {
      rooms: RoomStore.all(),
    }
  },

  componentWillMount: function(){
    this.context.showMap();
    this.reboundMap();
  },

  componentWillUnmount: function(){
    this.context.hideMap()
  },

  componentWillReceiveProps: function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    this.context.showMap();
    this.reboundMap();
  },

  reboundMap: function(){
    if (this.context.map && this.props.location.search) {
      var bounds = JSON.parse(this.props.location.search.match(/(?:\location=?)(\S+)/)[1]);
      this.context.map.fitBounds(bounds);
    }
  },

  renderIndex: function(){
    if (this.context.bounds){
      return <Index/>
    }
  },

  render: function(){
    return (
      <div className="search-results-container">
        <section className="search-container">
          <SearchFields />
          { this.renderIndex() }
        </section>

        <FilterParams />

        {this.props.children}
      </div>
    )
  }
})

module.exports = SearchContent;
