module.exports = {
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true
    },
    stockId: {
      model: 'Stock',
      required: true
    },
    portfolioId: {
      model: 'Portfolio',
      required: true
    },
    type: {
      type: 'string',
      required: true,
      isIn: ['buy','sell']
    },
    quantity: {
      type: 'number',
      required: true
    },
    price: {
      type: 'number',
      required: true
    }
  },
  schema: true
};
