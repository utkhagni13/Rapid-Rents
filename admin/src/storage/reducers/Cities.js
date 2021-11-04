export const AllCities = (state = [], action) => {
    switch (action.type) {
        case "Update-City":
            return action.payload;
        case "Add-City": {
            return [...state, action.payload];
        }
        default:
            return state;
    }
};
