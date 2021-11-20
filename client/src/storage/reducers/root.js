import { combineReducers } from "redux";

// Import reducers
import { AllCities } from "./Cities";
import { AllSites } from "./Sites";

const rootReducer = combineReducers({
    AllCities,
    AllSites,
});

export default rootReducer;
