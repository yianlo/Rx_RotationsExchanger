var React = require('react'),
    AutocompleteSearch = require('../apis/autocomplete'),
    NavBar = require('../nav/navBar');


var LandingPage = React.createClass({

  // <source src="//demosthenes.info/assets/videos/polina.webm" type="video/webm"/>
  // <source src="//demosthenes.info/assets/videos/polina.mp4" type="video/mp4"/>
// "search-bar-container"
  render: function() {

    return (
      <div className="landing-container">
        <NavBar isLanding={true}/>
          <video autoPlay id="bgvid" loop
            poster="https://res.cloudinary.com/dcnac6iuq/image/upload/v1456600166/Screen_Shot_2016-02-25_at_10.39.06_PM_xhfpyq.png">
            <source src="https://res.cloudinary.com/dcnac6iuq/video/upload/ac_none/v1456472406/homevid_gu3pd7.mp4" type="video/mp4"/>
          </video>

          <div className="landing-content-container">
            <AutocompleteSearch
              id={"landing-search"}
              placeholder="Where are you rotating?"
              classname="search-on-landing"
              container="polina"
            />
          </div>
      </div>

    )
  }
})

module.exports = LandingPage;
