import React from "react";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.initialQuery || "",
      displayedQuery: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSearch() {
    this.setState({ displayedQuery: this.state.query });
    if (this.props.onSearch) {
      this.props.onSearch(this.state.query);
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  }

  render() {
    return (
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Search..."
          style={{ marginRight: "10px" }}
        />{" "}
        <button onClick={this.handleSearch}> Search </button>{" "}
        <p> Search Query: {this.state.displayedQuery} </p>{" "}
      </div>
    );
  }
}

export default SearchForm;
