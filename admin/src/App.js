import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/******** Components ********/
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/Pages/homepage/HomePage";
import AddCity from "./components/Pages/add-city/AddCity";
import AddSite from "./components/Pages/add-site/AddSite";
import AllBookings from "./components/Pages/all-bookings/AllBookings";
import AllSites from "./components/Pages/all-sites/AllSites";
import AllUsers from "./components/Pages/all-users/AllUsers";
import Footer from "./components/footer/Footer";

/******** Styles ********/
import "./styles/Common.scss";
import "./styles/Navbar.scss";
import "./styles/Footer.scss";

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
            <Route exact path="/add-city" component={AddCity} />
            <Route exact path="/add-site" component={AddSite} />
            <Route exact path="/bookings" component={AllBookings} />
            <Route exact path="/sites" component={AllSites} />
            <Route exact path="/users" component={AllUsers} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
