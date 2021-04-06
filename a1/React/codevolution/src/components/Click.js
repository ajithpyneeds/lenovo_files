// import React from "react";

// function Click() {
//   function clicker() {
//     console.log("Button Clicked");
//   }

//   return (
//     <div>
//       <button onClick={clicker}>Click Me</button>
//     </div>
//   );
// }

// export default Click;

import React, { Component } from "react";

class Click extends Component {
  Click() {
    console.log("Clicked the button");
  }

  render() {
    return (
      <div>
        <button onClick={this.Click}>Click</button>
      </div>
    );
  }
}

export default Click;
