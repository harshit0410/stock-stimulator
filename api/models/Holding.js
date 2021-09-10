module.exports = {
  attributes: {
	  id: {
      type: 'number',
      autoIncrement: true,
      unique: true
    },
    portfolioId: {
      type: 'number',
      required: true,
    },
    stockId: {
      type: 'number',
      required: true
    },
    avgPrice: {
      type: 'number',
      required: true
    },
    quantity: {
      type: 'number',
      required: true
    }
  },
  schema: true
};
