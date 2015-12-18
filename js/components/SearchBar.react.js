'user restrict';

var React = require('react');

var SearchBar = React.createClass({

  getInitialState: function() {
    return {
      filterText: this.props.filterText || '',
      inStockOnly: this.props.inStockOnly || false
    };
  },

  handleChange: function() {
    var filter_data = { filterText: this.refs.filterTextInput.value, inStockOnly: this.refs.inStockOnlyInput.checked };
    this.setState(filter_data);
    this.props.onSearch(filter_data);
  },
  render: function() {
    return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                value={this.state.filterText}
                ref="filterTextInput"
                onChange={this.handleChange}
            />
            <p>
                <input
                    type="checkbox"
                    checked={this.state.inStockOnly}
                    ref="inStockOnlyInput"
                    onChange={this.handleChange}
                />
                {' '}
                Only show products in stock
            </p>
        </form>
    );
  }
});

module.exports = SearchBar;
