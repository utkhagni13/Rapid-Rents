import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "../../../../styles/Auth.scss";
import { signup } from "../../../../requests/Authentication";
import { validateEmail } from "../../../../validator/Validate";

const genders = [
    {
        label: "Male",
        value: "M",
    },
    {
        label: "Female",
        value: "F",
    },
    {
        label: "Others",
        value: "O",
    },
];

const SignUp = ({ loggedIn }) => {
    const history = useHistory();
    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        showPassword: false,
        confirmPassword: "",
        gender: "",
    });
    const [click, setClick] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClickShowPassword = () => {
        setSignupData({
            ...signupData,
            showPassword: !signupData.showPassword,
        });
    };
    const handleGenderChange = (e) => {
        console.log(e.target.value);
        setSignupData({
            ...signupData,
            gender: e.target.value,
        });
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClick(true);
        console.log(signupData);
        if (
            signupData.firstName.length === 0 ||
            signupData.lastName.length === 0 ||
            signupData.email.length === 0 ||
            signupData.password.length === 0 ||
            signupData.confirmPassword.length === 0
        ) {
            Swal.fire({
                title: `<strong>Details missing</strong>`,
                icon: "info",
                position: "top-end",
            });
            return;
        }
        if (!validateEmail(signupData.email)) {
            Swal.fire({
                title: `<strong>Invalid email format</strong>`,
                icon: "info",
                position: "top-end",
            });
            return;
        }
        if (signupData.password !== signupData.confirmPassword) {
            Swal.fire({
                title: `<strong>Passwords and Confirm passwords do not match</strong>`,
                icon: "error",
                position: "top-end",
            });
            return;
        }
        const submitForm = async () => {
            signupData.role = "user";
            const res = await signup(signupData);
            if (res.data && res.error === null) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "<strong>Account Created</strong>",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setTimeout(function () {
                    history.push("/login");
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
                <div className="bgpage signup-bg">
                    <div className="loginPage">
                        <div className="signing-box">
                            <p className="stylefont">SignUp with RapidRents</p>
                            <form onSubmit={handleSubmit}>
                                <div className="input-inline">
                                    <div className="form-group">
                                        <p>First Name</p>
                                        <TextField
                                            className="mu-input"
                                            label="First Name"
                                            variant="outlined"
                                            error={!signupData.firstName.length && click}
                                            onChange={(e) =>
                                                setSignupData({
                                                    ...signupData,
                                                    firstName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <p>Last Name</p>
                                        <TextField
                                            className="mu-input"
                                            label="Last Name"
                                            variant="outlined"
                                            error={!signupData.lastName.length && click}
                                            onChange={(e) =>
                                                setSignupData({
                                                    ...signupData,
                                                    lastName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="input-inline">
                                    <div className="form-group">
                                        <p>Email</p>
                                        <TextField
                                            className="mu-input"
                                            label="Email"
                                            variant="outlined"
                                            error={!signupData.email.length && click}
                                            onChange={(e) =>
                                                setSignupData({
                                                    ...signupData,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <p>Password</p>
                                        <TextField
                                            className="mu-input"
                                            label="Password"
                                            type={signupData.showPassword ? "text" : "password"}
                                            value={signupData.password}
                                            onChange={(e) => {
                                                setSignupData({
                                                    ...signupData,
                                                    password: e.target.value,
                                                });
                                            }}
                                            error={!signupData.password.length && click}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {signupData.showPassword ? (
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
                                </div>
                                <div className="input-inline">
                                    <div className="form-group">
                                        <p>Confirm Password</p>
                                        <TextField
                                            className="mu-input"
                                            label="Confirm Password"
                                            type="password"
                                            value={signupData.confirmPassword}
                                            onChange={(e) => {
                                                setSignupData({
                                                    ...signupData,
                                                    confirmPassword: e.target.value,
                                                });
                                            }}
                                            error={!signupData.confirmPassword.length && click}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <p>Gender</p>
                                        <TextField
                                            id="outlined-select-currency-native"
                                            select
                                            label="Please select your gender"
                                            fullWidth
                                            value={signupData.gender}
                                            onChange={handleGenderChange}
                                            SelectProps={{
                                                native: true,
                                            }}
                                        >
                                            {genders.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                                <div style={{ visibility: "hidden" }} className="small-links">
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
                                <button
                                    style={{ width: "30%" }}
                                    type="submit"
                                    className="submit-form yellow"
                                >
                                    SUBMIT
                                </button>
                                <br />
                                <br />
                                <hr />
                                <br />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignUp;
