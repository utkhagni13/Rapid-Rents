import axios from "./Axios";

export const login = async (email, password) => {
    const url = "/login";
    const body = {
        email: email,
        password: password,
        role: "User",
    };
    console.log(body);
    try {
        const res = await axios.post(url, body);
        return res.data;
    } catch (err) {
        return err.response
            ? err.response.data
            : { data: null, error: "Not connected to the server" };
    }
};

export const logout = async () => {
    const url = "/logout";
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

export const getUserData = async () => {
    const url = "/getuserdata";
    const body = {};
    try {
        const res = await axios.post(url, body);
        console.log(res);
        return res.data;
    } catch (err) {
        return err.response
            ? err.response.data
            : { data: null, error: "Not connected to the server" };
    }
};
