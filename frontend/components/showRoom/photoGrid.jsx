var React = require('react');

var titles = ["Bedroom", "Kitchen", ""];
var content = ["Spacious bedroom with carpet", "clean kitchen", "private bathroom"];

var PhotoGrid = React.createClass({
  contextTypes: {
    imgUrls: React.PropTypes.array,
  },

  getGrids: function(){
    // this.context.images
    return this.context.imgUrls.map( function(imgUrl, index){
      return (
        <div className="photo-detail-grids">
          <div className="img-grid">{imgUrl}</div>
          <div className="content-grid">
            <h5>{titles[index]}</h5>
            <p>{content[index]}</p>
          </div>
        </div>
      )
    })
  },

  render: function() {
    return (
      <div className="photo-grids-container">
        { this.context.imgUrls }
      </div>
    )
  }
});


module.exports = PhotoGrid;
