export const addNewCity = (payload) => {
    return { type: "Add-City", payload: payload };
};

export const updateCity = (payload) => {
    return { type: "Update-City", payload: payload };
};
