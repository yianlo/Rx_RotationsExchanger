var React = require('react');

var SearchButtonsOnLanding = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleClick: function(){
    this.context.router.replace('main/search');
    this.props.updateMap();
  },

  getMoreLink: function(){
    <div className="more-link-container">
      <a id="more-link">find out more</a>
    </div>
  },

  render: function() {
    return(
      <div className="landing-buttons-container" onClick={this.handleClick}>
        <button onClick={this.handleClick}>Find a Home</button>
      </div>
    )
  }
})


module.exports = SearchButtonsOnLanding;
