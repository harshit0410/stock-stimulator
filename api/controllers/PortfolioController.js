module.exports = {
  findOne: async (req, res) => {
    let options = req.allParams();
    let resData = await Portfolio.findOne({id: options.portfolioId});
    let curval = await PortfolioService.getCurrentPortfolioValue(options.portfolioId);

    res.send(_.assign(resData, {'currentValue': curval}));
  }
};
