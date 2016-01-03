var React = require('react');
var firebaseUtils = require('../../utils/firebaseUtils');
import { createHistory, useBasename } from 'history'
import { Router, History } from 'react-router';

const history = useBasename(createHistory)({
  basename: '/'
})

var Register = React.createClass({
  mixins: [ Router.Navigation ],
  getInitialState: function() {
    return {errors: []};
  },
  handleSubmit: function(e){
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pw = this.refs.pw.getDOMNode().value;
    var name = this.refs.name.getDOMNode().value;
    var mobile = this.refs.mobile.getDOMNode().value;
    firebaseUtils.createUser({email: email, password: pw, name: name, mobile: mobile}, function(result){
      console.log("user result", result);
      if(result){
        history.pushState(null, "/public/#/dashboard")
        // this.replaceWith('dashboard');
      }
    }.bind(this), function(err){
      var error;
      switch (err.code) {
        case "EMAIL_TAKEN":
          error = "The new user account cannot be created because the email is already in use.";
          break;
        case "INVALID_EMAIL":
          error = "The specified email is not a valid email.";
          break;
        default:
          error = "Error creating user";
          console.log("Error creating user due to:", err);
      }
      this.setState({
        errors: [error]
      });
      console.log("errors", this.state.errors[0]);
    }.bind(this));
  },
  componentDidMount: function(){
  },
  componentWillUnmount: function(){
  },
  render: function(){
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input ref="name" className="form-control" placeholder="Name" />
          </div>
          <div className="form-group">
            <label> Email </label>
            <input className="form-control" type="email" ref="email" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Mobile</label>
            <input ref="mobile" type="tel" maxlength="10" className="form-control" placeholder="Mobile" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="pw" type="password" className="form-control" placeholder="Password" />
          </div>
          <div>{this.state.errors[0]}</div>
          <div></div>
          <button type="submit" className="btn btn-primary">Register</button>

        </form>
      </div>
    )
  }
});

module.exports = Register;