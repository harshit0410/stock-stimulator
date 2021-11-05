module.exports ={
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true
    },
    currentValue: {
      type: 'number',
      defaultsTo: 0
    },
    investedValue: {
      type: 'number',
      defaultsTo: 0
    }
  },
  schema: true
};
