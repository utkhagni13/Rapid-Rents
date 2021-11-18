import React from "react";
import Swal from "sweetalert2";
import { states } from "../../../data/Data";
import AutoComplete from "../../common/AutoComplete";

const CitySelect = ({ citiesData, stateName, setStateName, city, setCity }) => {
    const filteredList = citiesData.filter((city) => city.state === stateName);
    return (
        <div>
            <div className="welcome-font">
                <p>
                    No need to panic when moving to a new city. Get a Room of your choice within few
                    minutes with...
                </p>
                <p className="site-name">Rapid-Rents</p>
            </div>
            <div style={{ padding: "var(--normalGap)" }}>
                <form>
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
                    <button className="search-sites" type="submit">
                        SEARCH
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CitySelect;
