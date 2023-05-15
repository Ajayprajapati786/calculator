import logo from "./logo.svg";
import "./App.css";
import { Redirect, Switch, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Calculator from "./components/Calculator";
import NavBar from "./components/NavBar";

import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/calculator">
          {isAuthenticated && <Calculator />}
          {!isAuthenticated && <Redirect to="/" />}
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
