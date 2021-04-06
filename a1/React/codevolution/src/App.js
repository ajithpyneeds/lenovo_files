import React from "react";
import "./App.css";
import Func from "./components/Func";
import Message from "./components/Message";
import Counter from "./components/Counter";
import HookCounter from "./components/HookCounter";
import HookCounterTwo from "./components/HookCounterTwo";
import HookCounterThree from "./components/HookCounterThree";
import HookCounterFour from "./components/HookCounterFour";
import Clss from "./components/Clss";
import Click from "./components/Click";
import Data from "./components/Data";
import Color from "./components/Color";
import Get from "./components/Get";

function App() {
  return (
    <div className="App">
      {/* <Func name="Ajith" />
      <Message />
      <Counter />
      <HookCounter />
      <HookCounterTwo />
      <HookCounterThree />
      <HookCounterFour />
      <Clss />
      <Click />
      <Data />
      <Color /> */}
      <Get />
    </div>
  );
}

export default App;
