import React, { Component } from "react";

class Cls extends Component {
  render() {
    return <h3 onClick={this.props.myalert}>{this.props.lang} is my first programming language</h3>
  }
}

export default Cls;
