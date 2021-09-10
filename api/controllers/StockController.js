module.exports ={
  getStockPrice: (req, res) => {
    res.send('<h1>Stock Market Stimulator</h1> <br> <h3>This is the home page of this application</h3>');
  },

  find: async (req, res) => {
    var resData = await Stock.find();

    res.send(resData);

  },

  findOne: async (req, res) => {
    var options = req.allParams();

    var resData = await Stock.findOne({id: options.id});

    res.send(resData);
  },

  create: async (req, res) => {
    var options = req.allParams();

    var resData = await Stock.create(options.data).fetch();

    res.send(resData);
  },

  update: async (req, res) => {
    var options = req.allParams();

    var resData = await Stock.update({id: options.id}).set(options.data).fetch();

    res.send(resData);
  },

  destroy: async (req, res) => {
    var options = req.allParams();

    var resData = await Stock.destroy({id: options.id}).fetch();

    res.send(resData);
  }
};
