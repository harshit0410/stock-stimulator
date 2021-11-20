module.exports = {

  create: async (req, res) => {
    let options = CommonService.getOptions(req);
    let passdetails = UserService.encrypPassword(options.data.password);
    let resData;
    try {
      await sails.getDatastore('mySQL').transaction(
        async (db) => {
          let portfolioId = await PortfolioService.createPortfolio(db);
          let walletId = await WalletService.createWallet(db);
          let details = {
            type: 'user',
            state: 'active',
            verified: 1,
            portfolioId,
            walletId
          };

          resData = await User.create(_.assign(options.data, passdetails, details)).usingConnection(db).fetch();
        }
      );
    }
    catch (err) {
      return res.status(500).send('Something Went wrong');
    }
    return res.send(_.omit(resData, ['encrypPassword', 'salt', 'type']));


  },

  findOne: async (req, res) => {
    let options = CommonService.getOptions(req);
    let resData;

    try {
      resData = await UserService.getUser(options.userId);

      if (resData.length === 0) {
        throw new Error('User does not exist.');
      }
    }
    catch (err) {
      return res.status(500).send(err.message || 'Server Error');
    }

    return res.send(resData);
  },

  update: async (req, res) => {
    let options = CommonService.getOptions(req);
    let resData;

    try {
      resData = await User.update({id: options.userId}).set(options.data).fetch();
    }
    catch (err) {
      return res.status(500).send(err.message || 'Server Error');
    }

    return res.send(resData);
  }
};
