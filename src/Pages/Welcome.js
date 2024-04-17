import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CredentialsContext } from "../App";
import Todos from "../Components/Todo";
import './welcom.css'

export default function Welcome() {
  const [credentails, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
  };

  return (
    <div>
      {credentails && <button className="logout" onClick={logout}>Logout</button>}
      <h1 className="center">Welcome {credentails && credentails.username}</h1>
      {!credentails && <Link className="center" to="/register">Register</Link>}
      <br />
      {!credentails && <Link  className="center"to="/login">Login</Link>}
      {credentails && <Todos />}
    </div>
  );
}