export const Admin = (state = [], action) => {
    switch (action.type) {
        case "Update-Admin":
            return action.payload;
        default:
            return state;
    }
};
