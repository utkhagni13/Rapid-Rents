import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { states } from "../../../data/Data";
import AutoComplete from "../../common/AutoComplete";

const CitySelect = ({ citiesData, stateName, setStateName, city, setCity }) => {
    const history = useHistory();
    const filteredList = citiesData.filter((city) => city.state === stateName);
    const handleSubmit = () => {
        console.log(city);
        if (city === "") {
            Swal.fire({
                position: "top-end",
                icon: "info",
                title: "<strong>Please select a city</strong>",
                text: "Select a state then a city from the list appearing below",
                showConfirmButton: true,
            });
            return;
        }
        history.push(`/search/${stateName}/${city._id}`);
    };

    return (
        <div>
            <div className="welcome-font">
                <p>No need to panic when moving to a new city.</p>
                <p>Get a Room of your choice within few minutes with...</p>
                <p className="site-name">Rapid-Rents</p>
            </div>
            <div style={{ padding: "var(--normalGap)" }}>
                <div className="city-select">
                    <div className="form-group">
                        <p>Select State</p>
                        <AutoComplete
                            list={states}
                            setState={setStateName}
                            state={stateName}
                            query={"name"}
                        />
                    </div>
                    <div className="form-group">
                        <p>Select City</p>
                        <AutoComplete
                            list={stateName.length ? filteredList : []}
                            setState={setCity}
                            state={city}
                            query={"cityName"}
                        />
                    </div>
                </div>
                <button className="search-sites" onClick={handleSubmit}>
                    SEARCH
                </button>
            </div>
        </div>
    );
};

export default CitySelect;
