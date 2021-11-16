import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/******** Components ********/
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/Pages/homepage/HomePage";
import Login from "./components/Pages/auth/login/Login";
import SignUp from "./components/Pages/auth/signup/Signup";
import Footer from "./components/footer/Footer";

/******** Files ********/
import { getUserData } from "./requests/Authentication";

/******** Styles ********/
import "./styles/Common.scss";
import "./styles/Navbar.scss";
import "./styles/Footer.scss";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        //fetch user data
        const getuserdata = async () => {
            const res = await getUserData();
            console.log("getuserdata_res:", res);
            if (res.data) {
                setLoggedIn(true);
            }
        };
        getuserdata();
    }, [setLoggedIn]);

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
                        <Route exact path="/register" component={SignUp} />
                    </Switch>
                </main>
                <Footer />
            </Router>
        </>
    );
};

export default App;
