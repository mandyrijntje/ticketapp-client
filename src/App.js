import React from "react";
import { Route } from "react-router-dom";

import AuthPage from "./components/AuthPage"
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/login" component={AuthPage} />
    </div>
  );
}

export default App;
