import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/******** Components ********/
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./components/Pages/auth/login/Login";
import SignUp from "./components/Pages/auth/signup/Signup";
import HomePage from "./components/Pages/homepage/HomePage";
import SiteDetails from "./components/Pages/details/SiteDetails";
import SiteResults from "./components/Pages/results/SiteResults";

/******** Files ********/
import { fetchAllSites } from "./requests/Sites";
import { fetchAllCities } from "./requests/Cities";
import { getUserData } from "./requests/Authentication";
import { updateCity } from "./storage/actions/Cities";
import { updateSites } from "./storage/actions/Sites";
import { Userinfo } from "./storage/actions/User";

/******** Styles ********/
import "./styles/Common.scss";
import "./styles/Navbar.scss";
import "./styles/Footer.scss";

const App = () => {
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        //fetch user data
        const getuserdata = async () => {
            const res = await getUserData();
            console.log("getuserdata_res:", res);
            if (res.data) {
                setLoggedIn(true);
                dispatch(Userinfo(res.data));
            }
        };
        getuserdata();
    }, [dispatch]);

    useEffect(() => {
        //fetch all cities from server
        const getallcities = async () => {
            const res = await fetchAllCities();
            console.log(res);
            if (res.data && res.error === null) {
                console.log(res.data);
                dispatch(updateCity(res.data));
            }
        };
        getallcities();
    }, [dispatch]);

    useEffect(() => {
        // fetch all sites
        const getAllSites = async () => {
            const res = await fetchAllSites();
            console.log("getAllSites_res:", res);
            if (res.data && res.error === null) {
                console.log(res.data);
                dispatch(updateSites(res.data));
            }
        };
        getAllSites();
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
                            <HomePage />
                        </Route>
                        <Route exact path="/login">
                            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                        </Route>
                        <Route exact path="/register">
                            <SignUp loggedIn={loggedIn} />
                        </Route>
                        <Route exact path="/search/:stateName/:cityName">
                            <SiteResults loggedIn={loggedIn} />
                        </Route>
                        <Route exact path="/site-details/:siteid">
                            <SiteDetails loggedIn={loggedIn} />
                        </Route>
                    </Switch>
                </main>
                <Footer />
            </Router>
        </>
    );
};

export default App;
