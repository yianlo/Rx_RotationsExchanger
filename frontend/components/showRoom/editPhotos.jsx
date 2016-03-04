var React = require('react'),
    PhotoGrid = require('./photoGrid'),
    Cloudinary = require('../apis/cloudinary/Cloud'),
    apiUtil = require('../../util/apiUtil');

var EditPhotos = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {imgUrls: this.props.imageUrls}
  },

  componentWillReceiveProps: function(){
    if (this.props.imageUrls){
      this.setState({imgUrls: this.props.imageUrls})
    }
  },

  getImgUrls: function(imgs){
    var imgUrls = imgs.map( function(img){
      return img.url
    })

    apiUtil.createImages(imgUrls, this.props.room, this.redirectOnSuccess)
  },

  redirectOnSuccess: function(roomId){
    this.context.router.replace('/main/' + roomId + '/edit')
  },

  render: function() {
    return(
      <section className="images-container edit-images">
        <PhotoGrid imageUrls={this.state.imgUrls} edit={true}/>
        <Cloudinary getImgUrls={this.getImgUrls}/>
      </section>
    )
  }
})


module.exports = EditPhotos;
