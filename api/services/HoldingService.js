
module.exports = {
  addStock: async (options) => {
    let res = await Holding.findOne({portfolioId: options.portfolioId, stockId:options.stockId});

    if (res) {
      let existingQuantity = res.quantity;
      let existingPrice = res.avgPrice;

      let totalExistingPrice = existingPrice * existingQuantity;
      let totalNewPrice = options.price * options.quantity;

      let avgPrice = (totalExistingPrice + totalNewPrice) / (existingQuantity + options.quantity);

      let holding = await Holding.updateOne({
        portfolioId: options.portfolioId,
        stockId:options.stockId
      }).set({
        avgPrice,
        quantity: existingQuantity + options.quantity
      });

      return holding;
    }
    else {
      let holding = await Holding.create({
        portfolioId: options.portfolioId,
        stockId: options.stockId,
        quantity: options.quantity,
        avgPrice: options.price
      });

      return holding;
    }
  },

  removeStock: async (options) => {
    let holdings = await Holding.findOne({portfolioId: options.portfolioId, stockId:options.stockId});

    if (holdings) {
      let existingQuantity = holdings.quantity;
      let existingPrice = holdings.avgPrice;

      if (options.quantity <= existingQuantity) {
        if (options.quantity === existingQuantity) {
          let holding = await Holding.destroyOne({
            portfolioId: options.portfolioId,
            stockId:options.stockId
          }).fetch();

          return holding;
        }

        let totalExistingPrice = existingPrice * existingQuantity;
        let totalNewPrice = options.price * options.quantity;

        let avgPrice = (totalExistingPrice - totalNewPrice) / (existingQuantity - options.quantity);

        let holding = await Holding.updateOne({
          portfolioId: options.portfolioId,
          stockId:options.stockId
        }).set({
          avgPrice,
          quantity: existingQuantity - options.quantity
        }).fetch();

        return holding;
      }

      return Promise.reject(new Error('Sold quantity is greater than holding quantity.'));
    }
    else {
      return Promise.reject(new Error('Not such stock exist in your holding.'));
    }
  }
};
