import React from "react";
import "../../../../styles/Login.scss";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

const Login = () => {
    return (
        <div className="bgpage">
            <div className="sideimg"></div>
            <div className="loginPage">
                <p className="stylefont">Get yourself the most comfortable home</p>
                <div className="signing-box">
                    <h2>Login</h2>
                    <form>
                        <div className="form-group">
                            <p>Email</p>
                            <TextField className="mu-input" label="Email" variant="outlined" required />
                        </div>
                        <div className="form-group">
                            <p>Password</p>
                            <TextField className="mu-input" label="Password" type="password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
