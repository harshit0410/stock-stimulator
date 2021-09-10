module.exports = {
  findOne: async (req, res) => {
    let options = req.allParams();

    let resData = await Wallet.find({id: options.walletId});

    res.send(resData);
  }
};
