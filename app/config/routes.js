import React from 'react';
import { Route, IndexRoute } from 'react-router';
var Main = require('../components/Main');
var Register = require('../components/login-register/Register');
var Login = require("../components/login-register/Login");
var Logout = require('../components/login-register/Logout');
var Dashboard = require('../components/secure/Dashboard');
var Home = require("../components/Home");
var ByotSchedule = require("../components/screens/ByotSchedule")

var routes = (
  <Route path="/" component={Main}>
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="register" component={Register} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="home" component={Home} />
    <Route path="byots/new" component={ByotSchedule} />
    <IndexRoute component={Home} />
  </Route>
);

module.exports = routes;

// <IndexRoute component={Home} />

