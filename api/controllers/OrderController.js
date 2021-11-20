
module.exports = {
  create: async (req, res) => {
    let options= req.allParams();

    let stockData = await Stock.findOne({id:options.data.stockId});
    let stockPrice =stockData.price;
    _.assign(options.data, {price: stockPrice});
    let totalPrice = options.data.quantity * stockPrice;

    if ( options.data.type === 'buy') {
      try {
        await sails.getDatastore('mySQL').transaction(
          async (db) => {
            await WalletService.removeMoney(options.data, totalPrice, db);

            let resData = await OrderService.createOrder(options.data, db);

            await HoldingService.addStock(options.data, db);
            await PortfolioService.updatePortfolio(options.data, totalPrice, 'add', db);

            return res.send(resData);
          }
        );
      }
      catch (err) {
        return Promise.reject(err);
      }
    }

    else if (options.data.type === 'sell') {
      try {
        await sails.getDatastore('mySQL').transaction(
          async (db) => {
            let holdings = await HoldingService.removeStock(options.data, db);
            await PortfolioService.updatePortfolio(options.data, holdings.avgPrice * options.data.quantity, 'remove', db);

            let resData = await OrderService.createOrder(options.data, db);

            await WalletService.addMoney(options.data, totalPrice, db);
            return res.send(resData);
          }
        );
      }
      catch (err) {
        return Promise.reject(err);
      }
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
