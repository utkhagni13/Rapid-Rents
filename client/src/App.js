import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/******** Components ********/
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/Pages/homepage/HomePage";
import Login from "./components/Pages/auth/login/Login";
import SignUp from "./components/Pages/auth/signup/Signup";

/******** Styles ********/
import "./styles/Common.scss";
import "./styles/Navbar.scss";

const App = () => {
  return (
    <>
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </main>
      </Router>
    </>
  );
};

export default App;
