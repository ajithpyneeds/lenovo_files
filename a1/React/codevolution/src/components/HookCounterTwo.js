// import React, { useState } from "react";

// function HookCounterTwo() {
//   const initialValue = 0;
//   const [count, setCount] = useState(initialValue);

//   const incrementFive = () => {
//     for (let i = 0; i < 5; i++) {
//       setCount((preCount) => preCount + 1);
//     }
//   };

//   return (
//     <div>
//       Count: {count}
//       <button onClick={() => setCount(initialValue)}>Reset</button>
//       <button onClick={() => setCount((preCount) => preCount + 1)}>
//         Increment
//       </button>
//       <button onClick={() => setCount((preCount) => preCount - 1)}>
//         Decremet
//       </button>
//       <button onClick={incrementFive}>Increment 5</button>
//     </div>
//   );
// }

// export default HookCounterTwo;

import React, { useState } from "react";

function HookCounterTwo() {
  const initialValue = 0;
  const [count, setState] = useState(initialValue);

  return (
    <div>
      <button onClick={() => setState(initialValue)}>Reset {count}</button>
      <button onClick={() => setState(count + 1)}>Increment</button>
      <button onClick={() => setState(count - 1)}>Decrement</button>
      <button onClick={() => setState(count + 5)}>Increment 5</button>
    </div>
  );
}

export default HookCounterTwo;
