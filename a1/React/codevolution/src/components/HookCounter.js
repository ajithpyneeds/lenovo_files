// import React, { useState } from "react";

// function HookCounter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>Count {count}</button>
//     </div>
//   );
// }

// export default HookCounter;

import React, { useState } from "react";

function HookCounter() {
  const [count, setState] = useState(0);

  return <button onClick={() => setState(count + 1)}>Click {count}</button>;
}

export default HookCounter;
