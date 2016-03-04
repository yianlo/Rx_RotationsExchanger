var React = require('react');
var Carousel = require('nuka-carousel');

var DemoCarousel = React.createClass({
  mixins: [Carousel.ControllerMixin],

  contextTypes: {
    imgUrls: React.PropTypes.array,
  },

  render: function() {
    return (
      <Carousel
        framePadding={"30px 25px"}
        width="58%"
        dragging={true}
        speed={800}>
        {this.context.imgUrls}
      </Carousel>
    )
  }
});


module.exports = DemoCarousel;
