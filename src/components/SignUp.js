import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    cPassword: "",
  });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
      }),
    });
    const json = await response.json();

    if(!json.success){
    // Save the auth token and redirect
    localStorage.setItem("token", json.authtoken);
    history("/");
    props.showAlert("Account created successfully", "success");   
    } else{
        props.showAlert("Invalid credentials", "danger");
    }
    };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-2">
      <h2 className="my-3">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" name="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cPassword"
            name="password"
            onChange={onChange} minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="cPassword"
            onChange={onChange} minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
