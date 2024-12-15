import React from "react";
import "./GenreSelect.css"; // Import the CSS file for styling

class GenreSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedGenre: props.selectedGenre || "",
    };
    this.handleGenreSelect = this.handleGenreSelect.bind(this);
  }

  handleGenreSelect(genre) {
    this.setState({ displayedGenre: genre });
    if (this.props.onSelect) {
      this.props.onSelect(genre);
    }
  }

  render() {
    const { genres, selectedGenre } = this.props;

    return (
      <div style={{ marginBottom: "20px" }}>
        {" "}
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => this.handleGenreSelect(genre)}
            className={genre === selectedGenre ? "selected" : ""}
          >
            {genre}{" "}
          </button>
        ))}{" "}
        <p id="selected-genre"> Selected Genre: {this.state.displayedGenre} </p>{" "}
      </div>
    );
  }
}

export default GenreSelect;
