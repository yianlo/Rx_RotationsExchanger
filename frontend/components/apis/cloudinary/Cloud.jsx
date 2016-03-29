var React = require('react'),
    ReactDOM = require('react-dom'),
    UploadButton = require("./components/UploadButton");

var Images = React.createClass({
  getInitialState: function () {
    return { images: [] };
  },

  render: function () {
    return (
      <div>
        <UploadButton getImgUrls={this.props.getImgUrls}/>
      </div>
    );
  }
});

module.exports = Images;
