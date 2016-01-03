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
        console.log("user in login", user)
          this.loginWithPW(user, function(authData){
            addNewUser({
              email: user.email,
              mobile: user.mobile,
              name: user.name,
              uid: authData.uid,
              token: authData.token
            });
          }, cb);
      }
    }.bind(this));
  },
  // login: function(user, setUser, ecb){
  //   ref.authWithPassword(user, function(err, authData){
  //     if(err){
  //       console.log("Error in logging user", err.message);
  //       ecb(err);
  //     } else {
  //       cachedUser = authData;
  //       authData.email = user.email;
  //       cb(authData);
  //     }

  //   });

  // },
  loginWithPW: function(userObj, cb, cbOnRegister){
    ref.authWithPassword(userObj, function(err, authData){
      if(err){
        console.log('Error on login:', err.message);
        cbOnRegister && cbOnRegister(false, err);
      } else {
        authData.email = userObj.email;
        cachedUser = authData;
        cb(authData);
        this.onChange(true);
        cbOnRegister && cbOnRegister(true, userObj);
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
