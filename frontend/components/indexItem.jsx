var React = require('react'),
    RoomStore = require('../stores/room'),
    apiUtil = require('../util/apiUtil');


var IndexItem = React.createClass({
  getInitialState: function(){
    var pct = window.innerWidth >= 745 ? 0.38 * window.innerWidth/1000 : 0.45;
    var imgPct = window.innerWidth >= 745 ? 0.30 * window.innerWidth/1000 : 0.45;

    return {
      height: {height: window.innerWidth * pct + "px"},
      imgHeight: {height: window.innerWidth * imgPct + "px"},
    }
  },

  highlightMarker: function(){
    var coords = {
      "lat": this.props.room.lat,
      "lng": this.props.room.lng
    };

    ApiActions.sendMarkerToHighlight(coords)
  },

  unHighlightMarker: function(){
    ApiActions.sendMarkerToUnhighlight()
  },

  handleResize: function(e) {
    var pct = window.innerWidth >= 745 ? 0.38 * window.innerWidth/1000 : 0.45;
    var imgPct = window.innerWidth >= 745 ? 0.30 * window.innerWidth/1000 : 0.45;

    this.setState({
      height: {height: window.innerWidth * pct + "px"},
      imgHeight: {height: window.innerWidth * imgPct + "px"},
    });
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function(){
    return (
      <section
        className="result-item"
        onMouseOver={this.highlightMarker}
        onMouseOut={this.unHighlightMarker}
        style={this.state.height}>

        <section className="img-container" style={this.state.imgHeight}>
          <div className="wrapper">
            <img className="room-img"
              src= {this.props.room.img_url}></img>
          </div>

          <div className="price"><span className="dollar-sign">$&nbsp;</span>{this.props.room.price}</div>
        </section>

        <section className="room-detail">
          <h5>{ this.props.room.title }</h5>
          <h6>{ this.props.room.location_type + " & " + this.props.room.bench_type  }</h6>
        </section>

      </section>
    )
  }

})


module.exports = IndexItem;
