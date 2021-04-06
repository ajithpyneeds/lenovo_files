import React, { useState } from "react";

function Data() {
  const [users, setUsers] = useState([
    { name: "Ajith", message: "Good Morning" },
    { name: "Puttamma", message: "Very Good Morning" },
  ]);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li>
            {user.name} {user.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Data;
