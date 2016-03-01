var React = require('react'),
    ReactDOM = require('react-dom'),
    UploadButton = require("./components/UploadButton");

var Images = React.createClass({
  getInitialState: function () {
    return { images: [] };
  },
  
  componentDidMount: function () {
    // $.get("/api/images", function (images) {
    //   this.setState({images: images});
    // }.bind(this))
  },

  render: function () {
    return (
      <div>
        <UploadButton getImgUrls={this.props.getImgUrls}/>
      </div>
    );
  }
});
// document.addEventListener( 'DOMContentLoaded', function () {
//   ReactDOM.render(
//     <Images/>,
//     document.getElementById('root')
//   );
// }, false );


module.exports = Images;
