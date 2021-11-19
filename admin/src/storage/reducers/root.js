import { combineReducers } from "redux";

// Import reducers
import { AllCities } from "./Cities";
import { Admin } from "./Admin";

// Add reducers here
const rootReducer = combineReducers({
    AllCities,
    Admin,
});

export default rootReducer;
