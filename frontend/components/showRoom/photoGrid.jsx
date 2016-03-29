var React = require('react'),
    apiUtil = require('../../util/apiUtil'),
    SessionStore = require('../../stores/session');

var PhotoGrid = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
    imgUrls: React.PropTypes.array,
    imageUrls: React.PropTypes.array,
    roomId: React.PropTypes.number,
    hostId: React.PropTypes.number,
  },

  handleDelete: function(imgId){
    apiUtil.deleteImage(imgId, this.redirectOnSuccess)
  },

  redirectOnSuccess: function(){
    this.context.router.replace('/main/' + this.context.roomId + '/edit')
  },

  getDeleteButton: function(imageId){
    var currentUser = SessionStore.getUser();

    if (this.props.edit && currentUser && currentUser.id === this.context.hostId) {
      return <i className="delete-button fa fa-trash-o"
        onClick={this.handleDelete.bind(null, imageId)}></i>
    }
  },

  getGrids: function(){
    if (this.props.imageUrls) {
      return this.props.imageUrls.map( function(img, i){
        return (
          <div key={"img" + i} className="img-grid"
            style={{backgroundImage: 'url('+img.url+')'}}>
            {this.getDeleteButton(img.id)}
          </div>
        )
      }.bind(this))
    } else {
      return (
        <div className="img-grid"
          style={{backgroundImage: 'url('+IMAGE_URLS.NO_IMG+')'}}>
        </div>
      )
    }
  },

  render: function() {
    return (
      <div className="photo-grids-container">
        {this.getGrids()}
      </div>
    )
  }
});


module.exports = PhotoGrid;
