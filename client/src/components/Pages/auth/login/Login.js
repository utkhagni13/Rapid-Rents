import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../../../../styles/Login.scss";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const history = useHistory();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        showPassword: false,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            password: e.target.value,
        });
    };

    const handleClickShowPassword = () => {
        setLoginData({
            ...loginData,
            showPassword: !loginData.showPassword,
        });
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <div className="bgpage">
            <div className="sideimg"></div>
            <div className="loginPage">
                <div className="signing-box">
                    <p className="stylefont">Login to RapidRents</p>
                    <form>
                        <div className="form-group">
                            <p>Enter you email</p>
                            <TextField className="mu-input" label="Email" variant="outlined" required />
                        </div>
                        <div className="form-group">
                            <p>Enter the password</p>
                            <TextField
                                className="mu-input"
                                label="Password"
                                type={loginData.showPassword ? "text" : "password"}
                                value={loginData.password}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {loginData.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className="small-links">
                            <div style={{ textDecoration: "underline", cursor: "pointer" }}>Forgot password</div>
                            <div>
                                Don't have an account?
                                <span
                                    onClick={() => {
                                        history.push("/register");
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        color: "var(--buttonColor)",
                                        textDecoration: "underline",
                                    }}
                                >
                                    {" "}
                                    Sign Up
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="submit-form yellow">
                            SUBMIT
                        </button>
                        <br />
                        <br />
                        <hr />
                        <br />
                        <button className="submit-form red">
                            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                <FcGoogle />
                                Login with Google
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
