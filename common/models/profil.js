'use strict'
var loopback = require('loopback')
module.exports = function (Profil) {
  const User = loopback.User
  function generateToken () {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var token = ''
    for (var i = 0; i < 64; i++) {
      token += chars[Math.floor(Math.random() * chars.length)]
    }
    return token
  }

  //   ********** Creation and login ************

  Profil.createAndLogin = function (email, password, callback) {
    var idToken = generateToken()
    console.log('****' + idToken)
    var userToken = idToken
    callback(null, { email, userToken })
  }

  Profil.remoteMethod('createAndLogin', {
    http: {
      path: '/CreateLogin',
      verb: 'post'
    },
    accepts: [
      { arg: 'email', type: 'string' },
      { arg: 'password', type: 'string', required: true }
    ],
    returns: [
      { arg: 'Response Message', type: 'string' },
      {
        arg: 'email',
        type: 'string'
      },
      { arg: 'id', type: 'string', generated: true, id: true }
    ],
    description: 'create and login a user with an email and password '
  })
}
