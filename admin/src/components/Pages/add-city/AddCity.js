import React, { useState } from "react";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import StateAutoComplete from "../../common/auto-complete/StateAutoComplete";

import "../../../styles/AddForm.scss";
import { states } from "../../../data/Data";
import { addNewCity } from "../../../requests/Cities";

const AddCity = () => {
    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!stateName.length) {
            Swal.fire({
                title: "<strong>State is not selected</strong>",
                icon: "info",
                position: "top-end",
                text: "Please select a state for the entered city",
            });
            return;
        }
        const addCity = async () => {
            const res = await addNewCity({ stateName, cityName });
            if (res.data !== null) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "<strong>New City Added</strong>",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setTimeout(function () {
                    window.location.reload(true);
                }, 2500);
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: res.error,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        };
        addCity();
    };

    return (
        <div className="in-middle form-container">
            <div className="admin-forms">
                <div className="add-form">
                    <h2>Add a new city</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <p>Select State*</p>
                            <StateAutoComplete
                                list={states}
                                setState={setStateName}
                                state={stateName}
                                query={"name"}
                            />
                        </div>
                        <div className="form-group">
                            <p>Enter City Name*</p>
                            <TextField
                                className="mu-input"
                                label="City Name"
                                variant="outlined"
                                required
                                onChange={(e) => {
                                    setCityName(e.target.value);
                                }}
                            />
                        </div>
                        <button type="reset" style={{ backgroundColor: "var(--buttonColor)" }}>
                            RESET
                        </button>
                        <button type="submit">SUBMIT</button>
                    </form>
                </div>
                <div className="instructions">
                    <h3>Please Note...</h3>
                    <p>-{">"} Select a state from the list in the dropdown menu.</p>
                    <p>-{">"} Please make sure the city entered belongs to the state selected.</p>
                    <p>-{">"} Fields marked with an * are required</p>
                </div>
            </div>
        </div>
    );
};

export default AddCity;
