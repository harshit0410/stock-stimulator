const crypto = require('crypto');
module.exports = {

  encrypPassword: (password, prevsalt) => {
    let salt = prevsalt || crypto.randomBytes(10).toString('hex');
    let encrypPassword = crypto.createHash('sha256').update(password + salt).digest('base64'); 
    return {salt, encrypPassword};
  },

  getUser: async (userId) => {
    try {
      let userData = await User.findOne({id:userId});

      return _.omit(userData, ['encrypPassword', 'salt', 'type']);
    }

    catch (err) {
      return Promise.reject(new Error(err));
    }
  }

};
