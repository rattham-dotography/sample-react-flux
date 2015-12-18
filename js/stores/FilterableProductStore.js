'user strict';

var FilterableProductDispatcher = require('../dispatcher/FilterableProductDispatcher');
var ProductConstant = require('../constants/ProductConstant');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';


var _products = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];


var _products_data = {
  products: _products,
  filter: {
    filterText: '',
    inStockOnly: false
  }
};

function getMatchProduct(filter) {
  return function (product) {
    return !((product.name.indexOf(filter.filterText) === -1) || (!product.stocked && filter.inStockOnly))
  }
}

function filterProductByFilter(filter) {
  return {
    products: _products.filter(getMatchProduct(filter)),
    filter: filter
  }
}



var FilterableProductStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of TODOs.
   * @return [object]
   */
  getAll: function() {
    return _products_data;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

FilterableProductDispatcher.register(function(action) {
  switch(action.actionType) {

    case ProductConstant.FILTER_PRODUCT:
      _products_data = filterProductByFilter(action.filter);
      FilterableProductStore.emitChange();
      break;
    default:
      //no op
  }

});

module.exports = FilterableProductStore;
