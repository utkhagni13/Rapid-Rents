import { combineReducers } from "redux";

// Import reducers
import { AllCities } from "./Cities";
import { AllSites } from "./Sites";
import { Userinfo } from "./User";

const rootReducer = combineReducers({
    AllCities,
    AllSites,
    Userinfo,
});

export default rootReducer;
