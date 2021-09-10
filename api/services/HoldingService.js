
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
        quantity: options.quantity + existingQuantity
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
  removeStock: async () => {

  } 
};