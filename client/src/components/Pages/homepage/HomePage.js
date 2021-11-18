import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import CitySelect from "./CitySelect";
import "../../../styles/HomePage.scss";
import { fetchAllCities } from "../../../requests/Cities";
import { updateCity } from "../../../storage/actions/Cities";

const HomePage = () => {
    const citiesData = useSelector((state) => state.AllCities);
    const dispatch = useDispatch();
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!citiesData.length) {
            //fetch all cities from server
            const getallcities = async () => {
                const res = await fetchAllCities();
                console.log(res);
                if (res.data && res.error === null) {
                    console.log(res.data);
                    dispatch(updateCity(res.data));
                }
            };
            getallcities();
        }
    }, [citiesData, dispatch]);

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
