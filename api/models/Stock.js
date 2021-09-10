module.exports = {
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      required: true,
      unique: true
    },
    symbol: {
      type: 'string',
      required: true,
      unique: true
    },
    name: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      required: true
    }
  },
  schema: true
};
