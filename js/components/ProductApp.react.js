'user restrict';

var FilterableProductTable = require('./FilterableProductTable.react');
var React = require('react');

var ProductApp = React.createClass({
  render: function() {
    return (
      <FilterableProductTable />
    );
  }
});

module.exports = ProductApp;
