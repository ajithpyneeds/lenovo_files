import React, {Component} from 'react';

class Cl extends Component {

  createAlert(){
    alert('Hello. You Clicked Me');
  }

  render() {
    return <h2 onClick={this.createAlert}>Good Evening, had you { this.props.food }</h2>
  }
}

export default Cl;
