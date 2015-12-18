'user strict';

var SearchBar = require('./SearchBar.react');
var ProductTable = require('./ProductTable.react');
var React = require('react');
var FilterableProductStore = require('../stores/FilterableProductStore');
var FilterableProductActionCreators = require('../actions/FilterableProductActionCreators');


function getStateFromStores() {
  return FilterableProductStore.getAll();
}

var FilterableProductTable = React.createClass({
    getInitialState: function() {
      return getStateFromStores();
    },

    componentDidMount: function() {
      FilterableProductStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      FilterableProductStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div>
                <SearchBar onSearch={this._handleSearch} />
                <ProductTable products={this.state.products} />
            </div>
        );
    },

    _handleSearch: function(filter_data) {
      FilterableProductActionCreators.filterProducts(filter_data);
    },

    /**
     * Event handler for 'change' events coming from the FilterableProductStore
     */
    _onChange: function() {
      this.setState(getStateFromStores());
    }

});

module.exports = FilterableProductTable;
