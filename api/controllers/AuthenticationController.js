const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    let options = req.allParams();

    let user = await User.findOne({id: options.data.id});


    if (!user) {
      return res.status(400).json({
        'error': {
          'type': 'forbidden',
          'message': 'Invalid credential'
        }
      });
    }

    let epass = UserService.encrypPassword(options.data.password, user.salt);

    if (epass.encrypPassword !== user.encrypPassword) {
      return res.status(400).json({
        'error': {
          'type': 'forbidden',
          'message': 'Invalid credential'
        }
      });
    }

    let accessToken = jwt.sign({'i':user.id}, sails.config.detail.salt, {expiresIn: 3600});

    return res.ok({'access_token': accessToken, 'data': user});
  },

  isAuthenticated: async (req, res) => {
    let options = req.allParams();

    try {
      var decoded = jwt.verify(options.data.access_token, sails.config.detail.salt);

      return res.ok(decoded);
    }
    catch(err) {
      return res.status(403).json(err);
    }
  }
};
