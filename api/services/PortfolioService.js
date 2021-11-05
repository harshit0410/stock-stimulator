
module.exports = {

  createPortfolio: async () => {
    let res = await Portfolio.create().fetch();

    return res.id;
  },

  updatePortfolio: async (options, amount, type) => {
    let res = await Portfolio.findOne({id: options.portfolioId});
    let updatedPortfolio;

    switch (type) {
      case 'add':{
        updatedPortfolio = await Portfolio.updateOne({id: options.portfolioId}).set({investedValue: res.investedValue + amount});

        break;
      }
      case 'remove': {
        updatedPortfolio = await Portfolio.updateOne({id: options.portfolioId}).set({investedValue: res.investedValue - amount});

        break;
      }
    }

    return updatedPortfolio;
  },

  getCurrentPortfolioValue: async (portfolioId) => {
    let holdings = await Holding.find({portfolioId: portfolioId});
    let stockDetails = await Stock.find({id: _.map(holdings, 'stockId')});
    let stocks = _.reduce(stockDetails, (res, item) => {
      _.assign(res, {[item.id]: item});
      return res;
    }, {});
    let total = 0;

    _.forEach(holdings, (holding) => {
      console.log(holding);
      total += holding.quantity * _.get(stocks, [holding.stockId, 'price']);
    });

    return total;
  }
};
