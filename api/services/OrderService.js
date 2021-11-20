module.exports = {
  createOrder: async (options, db) => {
    let data = _.pick(options, ['stockId', 'portfolioId', 'type', 'quantity', 'price']);
    let resData = await Order.create(data).usingCOnnection(db).fetch();

    return resData;
  }
};
