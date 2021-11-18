import { combineReducers } from "redux";

// Import reducers
import { AllCities } from "./Cities";

const rootReducer = combineReducers({
    AllCities,
});

export default rootReducer;
