module.exports = {
  getOptions: (req) => {
    if (req.data) {
      return req.data;
    }

    let options = req.allParams();
    req.data = options;
    return req.data;
  }
};
