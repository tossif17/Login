import React, { useEffect, useState } from "react";
import Home from "./Home";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  // Add other properties as needed
}

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [datas, setDatas] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setDatas(data);
      });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrUsername || !phoneNumber) {
      setErrorMessage("Please enter a valid email or username and phone number");
    } else {
      // Perform login verification
      verifyLogin(emailOrUsername, phoneNumber);
    }
  };

  const verifyLogin = (input: string, phoneNumber: string) => {
    const user = datas.find(
      (user) =>
        (user.email === input || user.username === input) &&
        user.phone === phoneNumber
    );

    if (user) {
      console.log("Login successful");
      setLogin(true);
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <>
      <>
        {isLogin ? (
          // Render Home component when logged in
          <Home />
        ) : (
          // Render login form when not logged in
          <div className="login-container">
            <div className="login-form-container">
              <h2 className="text-center">Login Form</h2>
              <form onSubmit={handleLogin} className="login-form">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label mt-2">
                    Email address - username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password - Number
                  </label>
                  <input
                    className="mt-2 form-control"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                {errorMessage && <p>{errorMessage}</p>}
              </form>
            </div>
          </div>
        )}
      </>
    </>
  );
}
