import React from "react";
import { useSelector } from "react-redux";
import Login from "../auth/login/Login";
import "../../../styles/HomePage.scss";

const HomePage = ({ loggedIn, setLoggedIn }) => {
    const adminData = useSelector((state) => state.Admin);
    console.log(adminData);

    return (
        <>
            {loggedIn ? (
                <div className="my_container">
                    <div className="welcome-font">
                        <p className="site-name">
                            Welcome admin - {adminData.firstName} {adminData.lastName}
                        </p>
                        <p>Here is your Dashboard</p>
                    </div>
                </div>
            ) : (
                <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            )}
        </>
    );
};

export default HomePage;
