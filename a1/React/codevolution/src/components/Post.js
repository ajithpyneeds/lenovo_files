import React, { Component } from "react";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      title: "",
      body: "",
    };
  }

  changeHandler(e => { this.setState })

  render() {
    const { userid, title, body } = this.state;
    return (
      <div>
        <form>
          <div>
            <input
              type="text"
              name="userId"
              onChange={this.changeHandler}
            ></input>
          </div>
          <div>
            <input
              type="text"
              name="title"
              onChange={this.changeHandler}
            ></input>
          </div>
          <div>
            <input
              type="text"
              name="body"
              onChange={this.changeHandler}
            ></input>
          </div>
        </form>
      </div>
    );
  }
}

export default Post;
