var React = require('react'),
    AddFormItem = require('./addFormItem');

var AddForm = React.createClass({
  makeAccomOptions: function(){
    var accomOptions = [];
    while (i < 6) {
      accomOptions.push( <option key={i} value={i}>{i}</option> )
    }

    accomOptions.push( <option key="6+" value="6+">6+</option> )
    return accomOptions;
  },

  render: function(){
    return(
      <form className="add-form">
        <AddFormItem
          label="Location Type"
          choices={["Private", "Public"]}/>
        <AddFormItem label="Room Type"
          label="Room Type"
          choices={["Private room", "Shared room"]}/>

        <label className="add-form-label">Accomodates</label>
          <select>{this.makeAccomOptions()}</select>

        <label className="add-form-label">City</label>
          <input type="text" placeholder="e.g. San Francisco"></input>

        <label className="add-form-label">Title</label>
          <input type="text"></input>

        <label className="add-form-label">Price</label>
          <input type="text"></input>
      </form>
    )
  }
})

module.exports = AddForm;
