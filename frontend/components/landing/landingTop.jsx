var React = require('react'),
    AutocompleteSearch = require('../apis/autocomplete'),
    NavBar = require('../nav/navBar');

var LandingTop = React.createClass({
  handleClick: function(e){
    e.preventDefault();

    $("body").animate({scrollTop: 0}, "500");
  },

  render: function() {
    return (
      <div className="landing-top" onClick={this.handleClick}>
        <NavBar isLanding={true}/>
          <video autoPlay id="bgvid" loop
            poster="https://res.cloudinary.com/dcnac6iuq/image/upload/v1456600166/Screen_Shot_2016-02-25_at_10.39.06_PM_xhfpyq.png">
            <source src="https://res.cloudinary.com/dcnac6iuq/video/upload/ac_none/v1456472406/homevid_gu3pd7.mp4" type="video/mp4"/>
          </video>

          <div className="landing-content-container">
            <AutocompleteSearch
              id={"landing-search"}
              placeholder="Where do you want to go? (i.e. San Francisco)"
              classname="search-on-landing"
              container="polina"
            />
          </div>
      </div>

    )
  }
})

module.exports = LandingTop;
