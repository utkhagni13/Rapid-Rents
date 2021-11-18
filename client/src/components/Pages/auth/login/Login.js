import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "../../../../styles/Auth.scss";
import { login } from "../../../../requests/Authentication";
import { validateEmail } from "../../../../validator/Validate";

const Login = ({ loggedIn, setLoggedIn }) => {
    const history = useHistory();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        showPassword: false,
    });
    const [click, setClick] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setClick(true);
        console.log(loginData);
        if (loginData.password.length === 0 || loginData.email.length === 0) {
            Swal.fire({
                title: `<strong>Details missing</strong>`,
                icon: "info",
                position: "top-end",
            });
            return;
        }
        if (!validateEmail(loginData.email)) {
            Swal.fire({
                title: `<strong>Invalid email format</strong>`,
                icon: "info",
                position: "top-end",
            });
            return;
        }
        const submitForm = async () => {
            const res = await login(loginData.email, loginData.password);
            if (res.data && res.error === null) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "<strong>Login Successful</strong>",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setTimeout(function () {
                    setLoggedIn(true);
                    history.push("/");
                }, 2500);
            } else {
                Swal.fire({
                    title: `<strong>${res.error}</strong>`,
                    icon: "error",
                    position: "top-end",
                });
            }
        };
        submitForm();
    };

    const homePageRedirect = () => {
        history.push("/");
    };

    return (
        <>
            {loggedIn ? (
                <>{homePageRedirect()}</>
            ) : (
                <div className="bgpage">
                    <div className="sideimg"></div>
                    <div className="loginPage">
                        <div className="signing-box">
                            <p className="stylefont">Login to RapidRents</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <p>Enter you email</p>
                                    <TextField
                                        className="mu-input"
                                        label="Email"
                                        variant="outlined"
                                        error={!loginData.email.length && click}
                                        onChange={(e) =>
                                            setLoginData({
                                                ...loginData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <p>Enter the password</p>
                                    <TextField
                                        className="mu-input"
                                        label="Password"
                                        type={loginData.showPassword ? "text" : "password"}
                                        value={loginData.password}
                                        onChange={handleChange}
                                        error={!loginData.password.length && click}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {loginData.showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="small-links">
                                    <div style={{ textDecoration: "underline", cursor: "pointer" }}>
                                        Forgot password
                                    </div>
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
                            </form>
                            <button className="submit-form red">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <FcGoogle />
                                    Login with Google
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
