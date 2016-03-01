var React = require('react'),
    SearchFields = require('./searchFields/searchFields'),
    Index = require('./searchResults/index'),

    FilterParams = require('./searchResults/FilterParams'),
    FilterParamsStore = require('../../stores/filterParams'),

    NavBar = require('../nav/navBar');

var SearchContent = React.createClass({
  contextTypes: {
    bounds: React.PropTypes.object,
    showMap: React.PropTypes.func,
    hideMap: React.PropTypes.func
  },

  getInitialState: function(){
    return { rooms: RoomStore.all() }
  },

  componentWillMount: function(){
    this.context.showMap()
  },

  componentWillUnmount: function(){
    this.context.hideMap()
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
