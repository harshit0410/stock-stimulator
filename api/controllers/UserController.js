module.exports = {

  create: async (req, res) => {
    let options = req.allParams();
    let passdetails = UserService.encrypPassword(options.data.password);

    let portfolioId = await PortfolioService.createPortfolio();
    let walletId = await WalletService.createWallet();
    let details = {
      type: 'user',
      state: 'active',
      verified: 1,
      portfolioId,
      walletId
    };

    var resData = await User.create(_.assign(options.data, passdetails, details)).fetch();

    res.send(resData);
  },

  findOne: async (req, res) => {
    var options = req.allParams();

    var resData = await User.findOne({id: options.id});

    res.send(resData);
  },

  update: async (req, res) => {
    var options = req.allParams();

    var resData = await User.update({id: options.id}).set(options.data).fetch();

    res.send(resData);
  }
};
