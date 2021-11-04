import React from "react";
import Swal from "sweetalert2";
import { states } from "../../../../data/Data";
import StateAutoComplete from "../../../common/auto-complete/StateAutoComplete";

const Cityform = ({ citiesData, setShowForm, cityName, stateName, setCityName, setStateName }) => {
    const filteredList = citiesData.filter((city) => city.state === stateName);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(stateName.length, cityName.length);
        if (!stateName.length) {
            Swal.fire({
                title: "<strong>State is not selected</strong>",
                icon: "info",
                position: "top-end",
                text: "Please select a state then select the city.",
            });
            return;
        }
        if (!cityName.length) {
            Swal.fire({
                title: "<strong>City invalid</strong>",
                icon: "info",
                position: "top-end",
                text: "Please select a city after selecting the state from the list appearing below the input box",
            });
            return;
        }
        console.log(stateName, cityName);
        setShowForm(true);
    };

    return (
        <div className="in-middle form-container">
            <div className="admin-forms">
                <div className="add-form">
                    <h2>Add a new Rental Site</h2>
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
                            <p>Select City*</p>
                            <StateAutoComplete
                                list={stateName.length ? filteredList : []}
                                setState={setCityName}
                                state={cityName}
                                query={"cityName"}
                            />
                            <div className="showlist">
                                <p
                                    style={{
                                        color: "var(--textColorLight)",
                                    }}
                                >
                                    {filteredList.length
                                        ? "Cities available: "
                                        : "No city available for the selected state "}
                                </p>
                                {filteredList.map((city, index) => (
                                    <p key={index}>{city.cityName}, </p>
                                ))}
                            </div>
                        </div>
                        <button type="submit">NEXT</button>
                    </form>
                </div>
                <div
                    style={{ borderLeft: "1px solid var(--borderColor)" }}
                    className="instructions"
                >
                    <h3>Please Note...</h3>
                    <p>
                        -{">"} First select a state from the list in the dropdown menu. This will
                        denote the state where the city of the rental site is situated.
                    </p>
                    <p>
                        -{">"} After selecting the state, select a city from the list in the
                        dropdown menu. This will denote the city where the rental site is situated.
                    </p>
                    <p>-{">"} Click "Next" button to add the details of the rental site.</p>
                </div>
            </div>
        </div>
    );
};

export default Cityform;
