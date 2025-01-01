import { React, useState, useContext } from "react";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const PostUser = () => {
    axios
      .post(`http://localhost:5000/users/register`, {
        firstName,
        email,
        password,
      })
      .then((res) => {
        setMessageType("success");
        setMessage(res.data.message);
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data.message);
          setMessageType("error");
        } else {
          setMessage("An unexpected error occurred");
          setMessageType("error");
        }
      });
  };

  return (
    <>
      <div className="Register">
        <input className="firstName" placeholder="First Name"
         onChange={(e)=>setFirstName(e.target.value)}
        ></input>
        <input className="Email" placeholder="Email"
         onChange={(e)=>setEmail(e.target.value)}
        ></input>
        <input className="Password" placeholder="Password"
         onChange={(e)=>setPassword(e.target.value)}
        ></input>
        <button className="Register-button" onClick={() => {
            PostUser();
          }}>Register</button>
      </div>
    </>
  );
};

export default Register;
