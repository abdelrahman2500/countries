import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './features/theme/themeSlice'
import countryReducer from './features/country/countrySlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer ,
        country: countryReducer
    }
})