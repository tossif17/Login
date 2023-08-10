import React, { useEffect, useState } from "react";



interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newUserName, setNewUserName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newWebsite, setNewWebsite] = useState<string>("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users").then((res) => {
      res.json().then((data: User[]) => {
        setUsers(data);
      });
    });
  }, []);

  const addUser = () => {
    const name = newName.trim();
    const username = newUserName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();
    if (name && username && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          username,
          email,
          website,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data: User) => {
          setUsers([...users, data]);
          setNewName("");
          setNewUserName("");
          setNewEmail("");
          setNewWebsite("");
        });
    }
  };

  const deleteUser = (id: number) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((values) => {
          return values.filter((item) => item.id !== id);
        });
      });
  };

  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Website</th>
            <th>Action</th>
            
           
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Add name here..."
              />
            </td>
            <td>
              <input
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Add username here..."
              />
            </td>
            <td>
              <input
                placeholder="Add email here..."
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder="Add website here..."
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
              />
            </td>
            <td>
              <button onClick={addUser}>Add user</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
