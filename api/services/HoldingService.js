
module.exports = {
  addStock: async (options, db) => {
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
      }).usingConnetion(db);

      return holding;
    }
    else {
      let holding = await Holding.create({
        portfolioId: options.portfolioId,
        stockId: options.stockId,
        quantity: options.quantity,
        avgPrice: options.price
      }).usingConnetion(db).fetch();

      return holding;
    }
  },

  removeStock: async (options, db) => {
    let holdings = await Holding.findOne({portfolioId: options.portfolioId, stockId:options.stockId});

    if (holdings) {
      let existingQuantity = holdings.quantity;

      if (options.quantity <= existingQuantity) {
        if (options.quantity === existingQuantity) {
          let holding = await Holding.destroyOne({
            portfolioId: options.portfolioId,
            stockId:options.stockId
          }).usingConnetion(db);

          return holding;
        }

        let holding = await Holding.updateOne({
          portfolioId: options.portfolioId,
          stockId:options.stockId
        }).set({
          quantity: existingQuantity - options.quantity
        }).usingConnetion(db);

        return holding;
      }

      return Promise.reject(new Error('Sold quantity is greater than holding quantity.'));
    }
    else {
      return Promise.reject(new Error('Not such stock exist in your holding.'));
    }
  }
};
