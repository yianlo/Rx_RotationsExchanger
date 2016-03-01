var React = require('react'),
    AddForm = require('./addForm')

var AddFormPage = React.createClass({
  render: function(){
    return(
      <div className="add-form-page">
        <div className="add-form-header">
          <h1>List Your Space</h1>
        </div>
        <AddForm/>
      </div>
    )
  }
})

module.exports = AddFormPage;
