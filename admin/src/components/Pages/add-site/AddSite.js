import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import "../../../styles/AddForm.scss";
import Siteform from "./site-form/Siteform";
import Cityform from "./city-select/Cityform";
import { fetchAllCities } from "../../../requests/Cities";
import { updateCity } from "../../../storage/actions/Cities";

const AddSite = () => {
    const citiesData = useSelector((state) => state.AllCities);
    const dispatch = useDispatch();
    const [cityName, setCityName] = useState("");
    const [stateName, setStateName] = useState("");

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!citiesData.length) {
            //fetch all cities from server
            const getallcities = async () => {
                const res = await fetchAllCities();
                if (res.data) {
                    console.log(res.data);
                    dispatch(updateCity(res.data));
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${res.error}`,
                    });
                }
            };
            getallcities();
        }
    }, [citiesData, dispatch]);

    return (
        <div>
            {showForm ? (
                <Siteform cityName={cityName} stateName={stateName} setShowForm={setShowForm} />
            ) : (
                <Cityform
                    citiesData={citiesData}
                    setShowForm={setShowForm}
                    cityName={cityName}
                    stateName={stateName}
                    setCityName={setCityName}
                    setStateName={setStateName}
                />
            )}
        </div>
    );
};

export default AddSite;
