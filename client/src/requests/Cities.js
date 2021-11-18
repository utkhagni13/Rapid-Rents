import axios from "./Axios";

export const fetchAllCities = async () => {
    const url = "/fetchallcities";
    const body = {};
    try {
        const res = await axios.post(url, body);
        return res.data;
    } catch (err) {
        return err.response
            ? err.response.data
            : { data: null, error: "Not connected to the server" };
    }
};
