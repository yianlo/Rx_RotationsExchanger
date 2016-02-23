var React = require('react'),
    AddForm = require('./addForm')


var AddFormPage = React.createClass({
  render: function(){
    return(
      <div className="add-form-page">
        <h1>List Your Bench</h1>
        <h3>Benchbnb lets you make money renting out your place.</h3>
        <AddForm />
      </div>
    )
  }
})

module.exports = AddFormPage;
