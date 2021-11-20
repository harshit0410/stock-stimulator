/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  'Authentication/isAuthenticated': true,
  'Authentication/login': 'validateLoginData',
  'User/create': 'validateUserData',
  'User/update': ['isAuthenticated', 'isValidUserId', 'validateUserData'],
  'User/findOne': ['isAuthenticated', 'isValidUserId'],
  '*': 'isAuthenticated'
};
