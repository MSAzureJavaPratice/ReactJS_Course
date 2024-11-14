import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialValue || 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return React.createElement(
      "div",
      { style: { marginBottom: "20px" } },
      React.createElement("h2", null, `Count: ${this.state.count}`),
      React.createElement(
        "button",
        { onClick: this.increment, style: { marginRight: "10px" } },
        "Increment"
      ),
      React.createElement("button", { onClick: this.decrement }, "Decrement")
    );
  }
}

export default Counter;
