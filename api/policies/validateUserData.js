
module.exports = async (req, res, next) => {
  let options = CommonService.getOptions(req);

  if (_.has(options, 'data')) {
    if(_.has(options.data, 'name') && _.has(options.data, 'email') && _.has(options.data, 'password')) {
      options.data = _.pick(options.data, ['name', 'email', 'password']);

      return next();
    }
  }

  return res.status(400).json({
    'error': {
      'name': 'badRequestError',
      'message': 'Missing body data'
    }
  });
};
