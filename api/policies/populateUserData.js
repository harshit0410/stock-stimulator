module.exports = async (req, res, next) => {
  let options = CommonService.getOptions(req);

  if(options.userId) {
    try {
      option.user = await UserService.getUser(options.userId); 
    }

    catch (err) {
      return res.status(500).json({
        'error': {
          'name': 'serverError',
          'message': 'Something went wrong'
        }
      });
    }
  }

  return next();
};
