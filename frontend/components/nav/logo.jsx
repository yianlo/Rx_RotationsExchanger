var React = require('react'),
    Link = require('react-router').Link;

var Logo = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
    isLanding: React.PropTypes.bool
  },

  backToIndex: function(){
    this.context.router.replace('main/search')
  },

  render: function() {
    return (
      <div className="logo" onClick={this.backToIndex}>
          <div className="logo-container">
            <img className="logo-design" src="http://res.cloudinary.com/dcnac6iuq/image/fetch/http://image.shutterstock.com/z/stock-photo-rx-pharmacy-symbol-made-out-of-red-pills-over-white-3947191.jpg"/>
          </div>

          <h2 className="logo-text">rotationsXchanger</h2>
      </div>
    );
  }
})

module.exports = Logo;
