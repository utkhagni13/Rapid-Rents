export const AllCities = (state = [], action) => {
    switch (action.type) {
        case "Update-City":
            return action.payload;
        default:
            return state;
    }
};
