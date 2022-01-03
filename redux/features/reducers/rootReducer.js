import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from '../theme/themeSlice';
import countryReducer from "../country/countrySlice";

export default combineReducers({
    themeReducer,
    countryReducer
})