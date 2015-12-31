// var React = require('react');
// var Router = require('react-router');
// var Route = Router.Route;
// var Main = require('../components/Main');
// var Register = require('../components/login-register/Register');
// var Login = require("../components/login-register/Login");
// var Logout = require('../components/login-register/Logout');
// var Dashboard = require('../components/secure/Dashboard');
// var Home = require("../components/Home");

// var routes = (
//   <Route component={Main} >
//     <Route name="login" component={Login} />
//     <Route name="logout" component={Logout} />
//     <Route name="register" component={Register} />
//     <Route name="dashboard" component={Dashboard} />
//     <Route name="home" path="/" component={Home} />
//   </Route>
// );

// module.exports = routes;


import React from 'react';
import { Route, IndexRoute } from 'react-router';
var Main = require('../components/Main');
var Register = require('../components/login-register/Register');
var Login = require("../components/login-register/Login");
var Logout = require('../components/login-register/Logout');
var Dashboard = require('../components/secure/Dashboard');
var Home = require("../components/Home");

var routes = (
  <Route path="/" component={Main}>
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="register" component={Register} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="home" component={Home} />
  </Route>
);

module.exports = routes;

// <IndexRoute component={Home} />

