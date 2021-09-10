module.exports = {
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true
    },
    money: {
      type: 'number',
      required: true
    }
  },
  schema: true
};
