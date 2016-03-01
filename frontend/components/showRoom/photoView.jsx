var React = require('react'),
    PhotoSlider = require('./photoSlider'),
    PhotoGrid = require('./photoGrid');

var PhotoView = React.createClass({
  // contextTypes: {
  //   router: React.PropTypes.object.isRequired,
  // },
  //
  getInitialState: function(){
    return ({
      view: "slider"
    })
  },

  toggleView: function(){
    if (this.state.view === "slider") {
      this.setState({ view: "grid" });
    } else if (this.state.view === "grid") {
      this.setState({ view: "slider" });
    }
  },

  renderImageView: function(){
    if (this.state.view === "slider") {
      return <PhotoSlider/>
    } else if (this.state.view === "grid") {
      return <PhotoGrid/>
    }
  },

  getButtonText: function(){
    if (this.state.view === "slider") {
      return "Grid View"
    } else if (this.state.view === "grid") {
      return "Slider View"
    }
  },

  render: function() {
    return(
      <section className="images-container">
        {this.renderImageView()}
        <button className="change-view-button"
          onClick={this.toggleView}>{this.getButtonText()}</button>
      </section>
    )
  }
})


module.exports = PhotoView;
