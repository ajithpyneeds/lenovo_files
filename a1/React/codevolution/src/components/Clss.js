// import React, { Component } from "react";

// class Clss extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       message: "How are you?",
//     };
//   }

//   changeMessage() {
//     this.setState({ message: "I am fine, how about you?" });
//   }

//   render() {
//     return (
//       <div>
//         <h1>{this.state.message}</h1>
//         <button onClick={() => this.changeMessage()}>Click me</button>
//       </div>
//     );
//   }
// }

// export default Clss;

import React, { Component } from "react";

class Clss extends Component {
  constructor() {
    super();
    this.state = {
      message: "Who is this?",
    };
  }

  changeMes() {
    this.setState({
      message: "I am a Developer",
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <button onClick={() => this.changeMes()}>Click</button>
      </div>
    );
  }
}

export default Clss;
