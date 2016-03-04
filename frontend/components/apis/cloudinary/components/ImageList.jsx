var React = require("react");

module.exports = React.createClass({
  render: function () {
    return(
      <ul>
        {this.props.images.map(function (image) {
          return (
            <li className="image" key={image.id}>
              <span>{image.age} ago</span>
              <img src={image.url}/>
            </li>
          );
        }, this)}
      </ul>
    );
  }
});
