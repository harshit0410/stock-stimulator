/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'GET /stock': 'StockController.find',
  'GET /stock/:id': 'StockController.findOne',
  'POST /stock': 'StockController.create',
  'PUT /stock/:id': 'StockController.update',
  'DELETE /stock/:id': 'StockController.destroy',
  'GET /': 'StockController.getStockPrice',

  'POST /user': 'UserController.create',
  'GET /user/:id': 'UserController.findOne',
  'PUT /user/:id': 'UserController.update',

  'POST /order': 'OrderController.create',
  'GET /order/:orderId': 'OrderController.findOne',
  'GET /orders/:portfolioId': 'OrderController.find',

  'GET /wallet/:walletId': 'WalletController.findOne',

  'GET /holding/:portfolioId': 'HoldingController.find',

  'GET /portfolio/:portfolioId': 'PortfolioController.findOne',

  'POST /login': 'AuthenticationController.login',
  'POST /check': 'AuthenticationController.isAuthenticated'
};
