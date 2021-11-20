export const AllSites = (state = [], action) => {
    switch (action.type) {
        case "Update-Sites":
            return action.payload;
        default:
            return state;
    }
};
