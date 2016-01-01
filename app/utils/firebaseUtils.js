var Firebase = require('firebase');
var ref = new Firebase('https://blinding-inferno-1823.firebaseio.com/');
var cachedUser = null;
var errors = [];

var addNewUser = function(newUser){
  var key = newUser.uid;
  ref.child('user').child(key).set(newUser);
};

var firebaseUtils = {
  getErrors: function(){
    return errors;
  },
  createUser: function(user, cb, ecb) {
    console.log("user", user)
    ref.createUser(user, function(err) {
      if (err) {
        if(ecb) { ecb(err) }
      } else {
          this.loginWithPW(user, function(authData){
            addNewUser({
              email: user.email,
              uid: authData.uid,
              token: authData.token
            });
          }, cb);
      }
    }.bind(this));
  },
  loginWithPW: function(userObj, cb, cbOnRegister){
    ref.authWithPassword(userObj, function(err, authData){
      if(err){
        console.log('Error on login:', err.message);
        cbOnRegister && cbOnRegister(false);
      } else {
        authData.email = userObj.email;
        cachedUser = authData;
        cb(authData);
        this.onChange(true);
        cbOnRegister && cbOnRegister(true);
      }
    }.bind(this));
  },
  isLoggedIn: function(){
    return cachedUser && true || ref.getAuth() || false;
  },
  logout: function(){
    ref.unauth();
    cachedUser = null;
    this.onChange(false);
  }
};

module.exports = firebaseUtils;
