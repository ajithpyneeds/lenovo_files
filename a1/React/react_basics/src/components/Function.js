import React from "react";

function Func(props) {
  return (
     <React.Fragment>
      <h1>My name is {props.name} and my age is {props.age}</h1>
      <h2>My favourite hobbie is {props.hobbie}</h2>
    </React.Fragment>
  );
}

export default Func;
