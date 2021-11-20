import React, { useState } from "react";
import { useSelector } from "react-redux";

import CitySelect from "./CitySelect";
import "../../../styles/HomePage.scss";

const HomePage = () => {
    const citiesData = useSelector((state) => state.AllCities);
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    return (
        <>
            <div className="my_container">
                <CitySelect
                    citiesData={citiesData}
                    stateName={stateName}
                    setStateName={setStateName}
                    city={city}
                    setCity={setCity}
                />
            </div>
            {/* <div className="my_container">
                <About />
            </div>
            <div className="my_container">
                <Services />
            </div> */}
        </>
    );
};

export default HomePage;
