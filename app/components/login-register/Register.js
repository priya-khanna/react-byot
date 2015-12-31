var React = require('react');
var firebaseUtils = require('../../utils/firebaseUtils');
var Router = require('react-router');
// import { createHistory, useBasename } from 'history';
// import { Router, History } from 'react-router';

// const history = useBasename(createHistory)({
//   basename: '/'
// })

var Register = React.createClass({
  mixins: [ Router.Navigation ],
  handleSubmit: function(e){
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pw = this.refs.pw.getDOMNode().value;
    // console.log("testing in register", email + '   ' + pw);
    firebaseUtils.createUser({email: email, password: pw}, function(result){
      if(result){
        // history.pushState(null, "/dashboard")
        this.replaceWith('dashboard');
      }
    }.bind(this));
  },
  render: function(){
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
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    )
  }
});

module.exports = Register;