import React, { useState, useRef } from "react";
import View from "./Components/View";
import "./App.css";

function App() {
  // React States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [text, setText] = useState("");
  const [viewUser, setViewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // React Refs
  const usernameRef = useRef();
  const passwordRef = useRef();

  const data = async (name, password) => {
    // POST request using fetch()
    const response = await fetch("http://localhost:3002/", {
      method: "POST",
      body: JSON.stringify({
        username: name,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (data.token === null) {
      setIsLoading(false)
      setText("Enter a valid user details by refreshing the page");
    } else {
      localStorage.setItem("token", data.token);
      formSubmitHandler();
    }
  };

  const formSubmitHandler = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:3002/", {
      method: "GET",
      headers: {
        token: token,
      },
    });
    const result = await response.json();
    localStorage.setItem("user", JSON.stringify(result));
    setViewUser(true);
    setIsLoading(false);
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    setIsLoading(true);
    const Username = usernameRef.current.value;
    const Password = passwordRef.current.value;
    setIsSubmitted(!isSubmitted);
    data(Username, Password);
  };

  const hideViewHandler = () => {
    setViewUser(false);
    setIsSubmitted(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Enter the Username: </label>
          <input type="text" name="uname" ref={usernameRef} required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" ref={passwordRef} required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {text === "" && !isLoading && <div className="title">Sign In</div>}
        {text === "" && isLoading && <div className="title"> Is loading...</div> }
        {text !== "" && <p>{text}</p>}
        {!isSubmitted && !viewUser && renderForm}
        {viewUser && <View onClose={hideViewHandler} />}
      </div>
    </div>
  );
}

export default App;
