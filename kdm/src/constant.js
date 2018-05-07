'use strict'

module.exports = {
  // cors
  cors: {
    // whitelist
    whitelist : [
      'http://0.0.0.0:5000',
      'http://localhost:5000'
    ]
  },

  //auth service url
  authService: {
    profileUrl: 'http://auth:4998/api/profile'
  }

}
