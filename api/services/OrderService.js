module.exports = {
  createOrder: async (options) => {
    let data = _.pick(options, ['stockId', 'portfolioId', 'type', 'quantity', 'price']);
    let resData = await Order.create(data).fetch();

    return resData;
  }
};
