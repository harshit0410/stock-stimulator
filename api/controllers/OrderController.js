
module.exports = {
  create: async (req, res) => {
    let options= req.allParams();

    let stockData = await Stock.findOne({id:options.data.stockId});
    let stockPrice =stockData.price;
    _.assign(options.data, {price: stockPrice});
    let totalPrice = options.data.quantity * stockPrice;

    await WalletService.removeMoney(options.data, totalPrice );

    let resData = await Order.create(options.data).fetch();

    await HoldingService.addStock(options.data);

    await PortfolioService.updatePortfolio(options.data, totalPrice, 'add');

    return res.send(resData);
  },

  find: async (req, res) => {
    let options= req.allParams();

    let resData = await Order.find({portfolioId: options.portfolioId});

    return res.send(resData);
  },
  findOne: async (req, res) => {
    let options= req.allParams();

    let resData = await Order.findOne({id: options.orderId});

    return res.send(resData);
  }
};
