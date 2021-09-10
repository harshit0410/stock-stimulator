module.exports = {
  findOne: async (req, res) => {
    let options = req.allParams();

    let resData = await Portfolio.find({id: options.portfolioId});

    res.send(resData);
  }
};
