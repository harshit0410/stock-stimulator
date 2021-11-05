
module.exports = {

  createWallet: async () => {
    let res = await Wallet.create({money: 10000}).fetch();

    return res.id;
  },

  addMoney: async (options, moneyToBeAdded) => {
    let res = await Wallet.findOne({id: options.walletId});
    let updatedWallet = await Wallet.updateOne({id: options.walletId}).set({money: res.money + moneyToBeAdded}).fetch();

    return updatedWallet;
  },

  removeMoney: async (options, moneyToBeRemoved) => {
    let res = await Wallet.findOne({id: options.walletId});

    if (res.money >= moneyToBeRemoved) {
      let updatedWallet = await Wallet.updateOne({id: options.walletId}).set({money: res.money - moneyToBeRemoved}).fetch();

      return Promise.resolve(updatedWallet);
    }

    else {
      return Promise.reject(new Error('Not enough money.'));
    }
  }
};
