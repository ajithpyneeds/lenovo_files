import React from "react";
import Eventsss from "./components/Eventsss";
import Func from "./components/Function";
import Cls from "./components/Class";

import "./App.css";

function createAlert() {
  alert("Yes, you clicked me");
}

function App() {
  return (
    <div className="App">
      <Eventsss />
      <Func name="Ajith" age="27" hobbie="Cycling" />
      <Cls lang="Python" myalert={createAlert} />
      <Func name="Puttamma" age="23" hobbie="Drawing" />
      <Cls lang=".Net" />
    </div>
  );
}

export default App;
