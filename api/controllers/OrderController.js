
module.exports = {
  create: async (req, res) => {
    let options= req.allParams();

    let stockData = await Stock.findOne({id:options.data.stockId});
    let stockPrice =stockData.price;
    _.assign(options.data, {price: stockPrice});
    let totalPrice = options.data.quantity * stockPrice;

    if ( options.data.type === 'buy') {
      await WalletService.removeMoney(options.data, totalPrice);

      let resData = await OrderService.createOrder(options.data);

      await HoldingService.addStock(options.data);
      await PortfolioService.updatePortfolio(options.data, totalPrice, 'add');

      return res.send(resData);
    }

    else if (options.data.type === 'sell') {
      let holdings = await HoldingService.removeStock(options.data);
      await PortfolioService.updatePortfolio(options.data, holdings.avgPrice * options.data.quantity, 'remove');

      let resData = await OrderService.createOrder(options.data);
      console.log(options.data);
      await WalletService.addMoney(options.data, totalPrice);
      return res.send(resData);
    }

    else {
      return Prommise.reject(new Error('Invaild type param'));
    }
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
