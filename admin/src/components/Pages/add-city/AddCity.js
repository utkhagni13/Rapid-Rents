import React, { useState } from "react";
import "../../../styles/AddForm.scss";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import AutoComplete from "../../common/AutoComplete";

const AddCity = () => {
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        if (!state.length) {
            Swal.fire({
                title: "<strong>State is not selected</strong>",
                icon: "info",
                position: "top-end",
                text: "Please select a state for the entered city",
            });
            return;
        }
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "<strong>New City Added</strong>",
            showConfirmButton: false,
            timer: 2000,
        });
        console.log(state, city);
        e.preventDefault();
    };

    return (
        <div className="in-middle form-container">
            <div className="admin-forms">
                <div className="add-form">
                    <h2>Add a new city</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <p>Select State*</p>
                            <AutoComplete setState={setState} state={state} />
                        </div>
                        <div className="form-group">
                            <p>Enter City Name*</p>
                            <TextField
                                className="mu-input"
                                label="City Name"
                                variant="outlined"
                                required
                                onChange={(e) => {
                                    setCity(e.target.value);
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
