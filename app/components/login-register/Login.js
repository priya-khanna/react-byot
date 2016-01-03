var React = require('react');
var firebaseUtils = require('../../utils/firebaseUtils');
import { createHistory, useBasename } from 'history'
import { Router, History } from 'react-router';
var ref = new Firebase('https://blinding-inferno-1823.firebaseio.com/');

const history = useBasename(createHistory)({
  basename: '/'
})

var Login = React.createClass({
  mixins: [Router.Navigation],
  statics: {
    attemptedTransition: null
  },
  getInitialState: function() {
    return {errors: []};
  },
  handleSubmit: function(e){
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pw = this.refs.pw.getDOMNode().value;
    firebaseUtils.loginWithPW({email: email, password: pw}, function(authData){
      if(Login.attemptedTransition){
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        history.pushState(null, "/public/#/dashboard")
        // this.replaceWith('dashboard');
      }
    }.bind(this), function(logged_in, data){
      if(logged_in) {
        var user;
        // console.log("logged in user", ref.getAuth().email);
        this.setState({ user: data });
      } else {
        this.setState({ errors: [data.message]});
        console.log("errors", this.state.errors[0]);
      }
    }.bind(this));
  },
  render: function(){
    // var errors = this.state.errors[0] ? <p> Error on Login </p> : '';
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Email </label>
            <input className="form-control" ref="email" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="pw" type="password" className="form-control" placeholder="Password" />
          </div>
          <div>{this.state.errors[0]}</div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
});

module.exports = Login;