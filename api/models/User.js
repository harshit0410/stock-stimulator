module.exports = {
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      unique: true
    },
    encrypPassword: {
      type: 'string',
      required: true
    },
    salt: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      required: true,
      isIn: ['user', 'admin']
    },
    state: {
      type: 'string',
      required: true,
      isIn: ['active', 'block']
    },
    verified: {
      type: 'number',
      required: true,
      isIn: [0,1]
    },
    portfolioId: {
      type: 'number',
      required: true
    },
    walletId: {
      type: 'number',
      required: true
    }
  },
  schema: true
  // customToJSON: function() {
  //   // Return a shallow copy of this record with the password and ssn removed.
  //   return _.omit(this, ['encrypPassword', 'salt', 'type']);
  // }
};

