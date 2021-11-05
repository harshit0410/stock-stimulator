
module.exports = {

  createPortfolio: async () => {
    let res = await Portfolio.create().fetch();

    return res.id;
  },

  updatePortfolio: async (options, amount, type) => {
    let res = await Portfolio.findOne({id: options.portfolioId});
    let updatedPortfolio;

    switch (type) {
      case 'add':{
        updatedPortfolio = await Portfolio.updateOne({id: options.portfolioId}).set({investedValue: res.investedValue + amount});

        break;
      }
      case 'remove': {
        updatedPortfolio = await Portfolio.updateOne({id: options.portfolioId}).set({investedValue: res.investedValue - amount});

        break;
      }
    }

    return updatedPortfolio;
  }
};
