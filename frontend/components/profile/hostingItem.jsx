var React = require('react');

var HostingItem = React.createClass({
  handleApprove: function(){
    apiUtil.approveBooking(this.props.hosting.id)
  },

  handleDeny: function(){
    apiUtil.denyBooking(this.props.hosting.id)
  },

  render: function(){
    return(
      <div className="hosting-item">
        <div>{}</div>
        <div>{this.props.hosting.booker.email}</div>
        <div>{this.props.hosting.checkin_date}</div>
        <div>{this.props.hosting.checkout_date}</div>
        <div>{this.props.hosting.status}</div>
        <div>{this.props.hosting.message}</div>
        <div className="buttons">
          <button onClick={this.handleApprove}>Approve</button>
          <button onClick={this.handleDeny}>Deny</button>
        </div>
      </div>

    )
  }
})


// <div>
//   <div class="card">
//     <img class="card-img-top" data-src="..." alt="Card image cap"/>
//     <div class="card-block">
//       <h4 class="card-title">{this.props.hosting.room.title}</h4>
//       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     </div>
//     <ul class="list-group list-group-flush">
//       <li class="list-group-item">Cras justo odio</li>
//       <li class="list-group-item">Dapibus ac facilisis in</li>
//       <li class="list-group-item">Vestibulum at eros</li>
//     </ul>
//     <div class="card-block">
//       <a href="#" class="card-link">Card link</a>
//       <a href="#" class="card-link">Another link</a>
//     </div>
//   </div>
// </div>

module.exports = HostingItem;
