// import React, { useState } from "react";

// function HookCounterThree() {
//   const [name, setName] = useState({ firstName: "", lastName: "" });

//   return (
//     <form>
//       <input
//         type="text"
//         value={name.firstName}
//         onChange={(e) => setName({ ...name, firstName: e.target.value })}
//       ></input>
//       <input
//         type="text"
//         value={name.lastName}
//         onChange={(e) => setName({ ...name, lastName: e.target.value })}
//       ></input>
//       <h2>Your First Name is - {name.firstName}</h2>
//       <h2>Your Last Name is - {name.lastName}</h2>
//       <h2>{JSON.stringify(name)}</h2>
//     </form>
//   );
// }

// export default HookCounterThree;

import React, { useState } from "react";

function HookCounterThree() {
  const [items, setItems] = useState([]);
  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length,
        value: Math.floor(Math.random() * 10),
      },
    ]);
  };

  return (
    <div>
      <button onClick={addItem}>Add a number</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default HookCounterThree;
