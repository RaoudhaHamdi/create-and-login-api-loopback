'use strict'
const loopback = require('loopback')
module.exports = function (Profil) {
  function generateToken () {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var token = ''
    for (var i = 0; i < 64; i++) {
      token += chars[Math.floor(Math.random() * chars.length)]
    }
    return token
  }

  //   ********** Creation and login ************
  Profil.createAndLogin = function (email, callback) {
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
      { arg: 'email', type: 'string', required: true },
      { arg: 'password', type: 'string', required: true }
    ],
    returns: [
      { arg: 'Response Message', type: 'string' },
      {
        arg: 'email',
        type: 'string'
      }
    ],
    description: 'create and login a user with an email and password '
  })
}
