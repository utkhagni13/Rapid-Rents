export const Userinfo = (state = [], action) => {
    switch (action.type) {
        case "Get-Userinfo":
            return action.payload;
        default:
            return state;
    }
};
