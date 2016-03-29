var React = require("react");

var UploadButton = React.createClass({
  getInitialState: function(){
    return {
      classname: "unclicked-button upload-image-button",
      text: "Add Photos"
    }
  },

  upload: function (e) {
    e.preventDefault();
    e.stopPropagation();

    cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS, function(error, results){
      if(!error){
        this.setState({classname: "clicked-button upload-image-button", text: "Photos Added!"})
        this.props.getImgUrls(results);
      }
    }.bind(this));
  },

  render: function () {
    return (
      <div className="upload-form add-form-item-container">
        <button className={this.state.classname} onClick={this.upload}>{this.state.text}</button>
      </div>
    );
  }
});

module.exports = UploadButton;
