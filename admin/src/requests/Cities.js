import axios from "./Axios";

export const fetchAllCities = async () => {
    const url = "/fetchallcities";
    const body = {};
    try {
        const res = await axios.post(url, body);
        return res.data;
    } catch (err) {
        return err.response ? err.response.data : { data: null, error: "Not connected to the server" };
    }
};

export const addNewCity = async (data) => {
    const url = "/addnewcity";
    const body = {
        state: data.stateName,
        cityName: data.cityName,
    };
    try {
        const res = await axios.post(url, body);
        return res.data;
    } catch (err) {
        return err.response ? err.response.data : { data: null, error: "Not connected to the server" };
    }
};
