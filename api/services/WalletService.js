
module.exports = {

  createWallet: async (db) => {
    let res = await Wallet.create({money: 10000}).usingConnection(db).fetch();

    return res.id;
  },

  addMoney: async (options, moneyToBeAdded, db) => {
    let res = await Wallet.findOne({id: options.walletId});
    let updatedWallet = await Wallet.updateOne({id: options.walletId}).set({money: res.money + moneyToBeAdded}).usingConnection(db);

    return updatedWallet;
  },

  removeMoney: async (options, moneyToBeRemoved, db) => {
    let res = await Wallet.findOne({id: options.walletId});

    if (res.money >= moneyToBeRemoved) {
      let updatedWallet = await Wallet.updateOne({id: options.walletId}).set({money: res.money - moneyToBeRemoved}).usingConnection(db);

      return Promise.resolve(updatedWallet);
    }

    else {
      return Promise.reject(new Error('Not enough money.'));
    }
  }
};
