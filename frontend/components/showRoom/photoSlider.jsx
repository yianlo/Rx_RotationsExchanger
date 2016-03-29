var React = require('react');
var Carousel = require('nuka-carousel');

var PhotoSlider = React.createClass({
  mixins: [Carousel.ControllerMixin],

  contextTypes: {
    imgUrls: React.PropTypes.array,
  },

  renderCarousel: function(){
    if(this.context.imgUrls){
      return(
        <Carousel
          framePadding={"30px 25px"}
          width="58%"
          dragging={true}
          speed={800}>
          {this.context.imgUrls}
        </Carousel>
      )
    } else {
      return <div></div>
    }
  },

  render: function() {
    return this.renderCarousel();
  }
});


module.exports = PhotoSlider;
