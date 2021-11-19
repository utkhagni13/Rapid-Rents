import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

/******** Components ********/
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/Pages/homepage/HomePage";
import AddCity from "./components/Pages/add-city/AddCity";
import AddSite from "./components/Pages/add-site/AddSite";
import AllBookings from "./components/Pages/all-bookings/AllBookings";
import AllSites from "./components/Pages/all-sites/AllSites";
import AllUsers from "./components/Pages/all-users/AllUsers";
import Footer from "./components/footer/Footer";

/******** Files ********/
import { getAdminData } from "./requests/Authentication";
import { updateAdmin } from "./storage/actions/Admin";

/******** Styles ********/
import "./styles/Common.scss";
import "./styles/Navbar.scss";
import "./styles/Footer.scss";

const App = () => {
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        //fetch admin data
        const getadmindata = async () => {
            const res = await getAdminData();
            console.log("Admin:", res);
            if (res.data && res.error === null) {
                setLoggedIn(true);
                dispatch(updateAdmin(res.data));
            }
        };
        getadmindata();
    }, [dispatch]);

    return (
        <>
            <Router>
                <header>
                    <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                </header>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                        </Route>
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
