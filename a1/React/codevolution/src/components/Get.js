// import React, { Component } from "react";
// import axios from "axios";

// class Get extends Component {
//   constructor() {
//     super();
//     this.state = {
//       posts: [],
//       errorMsg: "",
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("https://jsonplaceholder.typicode.com/posts")
//       .then((response) => {
//         console.log(response);
//         this.setState({ posts: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//         this.setState({ errorMsg: "Error retrieving data" });
//       });
//   }

//   render() {
//     const { posts, errorMsg } = this.state;
//     return (
//       <div>
//         List of Posts
//         {posts.length
//           ? posts.map((post) => <div key={post.id}>{post.title}</div>)
//           : null}
//         {errorMsg ? <div>{errorMsg}</div> : null}
//       </div>
//     );
//   }
// }

// export default Get;

import React, { Component } from "react";
import axios from "axios";

class Get extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      errorMsg: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        this.setState({ errorMsg: "Error Loading" });
      });
  }

  render() {
    const { posts, errorMsg } = this.state;
    return (
      <div>
        Some Dummy Data
        {posts.length
          ? posts.map((post) => <div key={post.id}>{post.title}</div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
      </div>
    );
  }
}

export default Get;
