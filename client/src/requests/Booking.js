import axios from "./Axios";

export const getPaymentOrder = async (totalAmt) => {
    const url = "/getpaymentorder";
    const body = {
        totalAmt: totalAmt,
    };
    try {
        const res = await axios.post(url, body);
        return res.data;
    } catch (err) {
        return err.response
            ? err.response.data
            : { data: null, error: "Not connected to the server" };
    }
};
