module.exports = {
  find: async (req, res) => {
    let options = req.allParams();

    let resData = await Holding.find({portfolioId: options.portfolioId});

    res.send(resData);
  }
};
