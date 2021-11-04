import { combineReducers } from "redux";

// Import reducers
import { AllCities } from "./Cities";

// Add reducers here
const rootReducer = combineReducers({
    AllCities,
});

export default rootReducer;
