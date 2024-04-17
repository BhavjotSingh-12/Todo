import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Login from './Pages/Login'
import Register from './Pages/Register'
export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Routes>
          <Route path="/" exact element={<Welcome />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
        </Routes>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App