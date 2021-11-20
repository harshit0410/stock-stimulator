
module.exports = async (req, res, next) => {
  let options = CommonService.getOptions(req);

  if (_.has(options, 'data')) {
    if(_.has(options.data, 'id') && _.has(options.data, 'password')) {
      options.data = _.pick(options.data, ['id', 'password']);

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
