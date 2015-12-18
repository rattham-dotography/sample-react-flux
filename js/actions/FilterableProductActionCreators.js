'user strict';

var FilterableProductDispatcher = require('../dispatcher/FilterableProductDispatcher');
var ProductConstant = require('../constants/ProductConstant');

var ActionTypes = ProductConstant.ActionTypes;

var FilterableProductActionCreators = {
  filterProducts: function(filter) {
    FilterableProductDispatcher.dispatch({
      type: ActionTypes.FILTER_PRODUCT,
      filter: filter
    });
  }
}

module.exports = FilterableProductActionCreators;
