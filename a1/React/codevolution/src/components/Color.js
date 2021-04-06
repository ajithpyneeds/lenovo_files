import React, { useState } from "react";

function Color() {
  const [isRed, setRed] = useState(false);
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setRed(!isRed);
  };

  return (
    <div>
      <h1 className={isRed ? "color" : ""}>I am Red</h1>
      <button onClick={increment}>{count} count</button>
    </div>
  );
}

export default Color;
