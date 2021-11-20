module.exports = async (req, res, next) => {

  let options = CommonService.getOptions(req);

  if (!req.get('x-access-token')) {
    return res.status(403).json({
      'error': {
        'type': 'ParamMissing',
        'message': 'Please provide header'
      }
    });
  }

  try {
    let decoded = await AuthenticationService.isAuthenticated(req.get('x-access-token'));

    options.userId = decoded.id;
    //req.options.data.userId = decoded.id;
    return next();
  }
  catch (err) {
    return res.status(403).json(err);
  }
};
