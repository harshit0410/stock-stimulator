const jwt = require('jsonwebtoken');

module.exports = {
  isAuthenticated: async (token) => {
    try {
      let decoded = jwt.verify(token, sails.config.detail.salt);

      return decoded;
    }
    catch(err) {
      return Promise.reject(err);
    }
  }
};
