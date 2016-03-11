var React = require('react'),
    SessionStore = require('../../stores/session'),
    RequestStore = require('../../stores/request'),
    apiUtil = require('../../util/apiUtil'),
    NavBarItem = require('./navBarItem');

var Requests = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object
  },

  getInitialState: function(){
    return {requests: RequestStore.getRequests()};
  },

  _onChange: function(){
    this.setState({requests: RequestStore.getRequests()});
  },

  componentWillMount: function(){
    if (this.context.currentUser) {
      apiUtil.fetchRequestsByUser(this.context.currentUser.id)
      this.setState({requests: RequestStore.getRequests()});
    }
  },

  componentDidMount: function(){
    if (this.context.currentUser) {
      this.setState({requests: RequestStore.getRequests()});
    }
    this.requestsListener = RequestStore.addListener( this._onChange );
  },

  componentWillUnmount: function(){
    this.requestsListener.remove();
  },

  renderRequests: function(){
    if (this.context.currentUser && this.state.requests) {
      return this.state.requests.map( function(request){
        return <NavBarItem className="submenu-items"
          text={[request.room.title.slice(0, 15),
            <span className={"request-status " + request.status}>{request.status}</span>
          ]}/>
    //       onClickFun={this.context.router.replace.bind(null, 'main/' + room.id)}/>
      }.bind(this))
    }
  },

  render: function(){

    // return <NavBarItem text="Requests" submenu={this.renderRequests()} newClass="submenu nav-items"/>

    if (this.state.requests.length > 0){
      return(
        <NavBarItem text="Requests" submenu={this.renderRequests()} newClass="submenu nav-items"/>
      )
    } else {
      return <NavBarItem text="No Requests"/>
    }
  }
})

module.exports = Requests;
