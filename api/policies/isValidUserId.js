module.exports = async (req, res, next) => {
  let options = CommonService.getOptions(req);

  if (parseInt(options.id) === options.userId) {
    return next();
  }

  return res.status(403).json({
    'error': {
      'name': 'forbiddenError',
      'message': 'You do not have access to this resource.'
    }
  });
};
