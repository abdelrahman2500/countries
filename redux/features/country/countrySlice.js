
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import countriesAPI from '../../../common/apis/countriesAPI';

export const fetchCountryByName = createAsyncThunk(
    'countries/fetchByName',
    async (countryName) => {
        const response = await countriesAPI.get(`name/${countryName}`)
        return response.data
    }
)

export const fetchOneCountry = createAsyncThunk(
    'countries/fetchOne',
    async (countryName) => {
        const response = await countriesAPI.get(`name/${countryName}?fullText=true`)
        return response.data
    }
)

export const fetchAllCountries = createAsyncThunk(
    'countries/fetchAllCounries',
    async (filterObj) => {
        // if (filterObj.allCountries){
        //     const response = await countriesAPI.get("all")
        // } else if(filterObj.getCountry) {

        // }
        const response = filterObj.allCountries ? await countriesAPI.get("all") 
                        : filterObj.getCountry ? await countriesAPI.get(`name/${filterObj.getCountry}`) 
                        : filterObj.getRegion ? await countriesAPI.get(`region/${filterObj.getRegion}`) 
                        : ""
        return response.data
    }
)


const initialState = {
    allCountries: {},
    searchValue: {},
    countryByName: [],
    loadingCountries: true,
    loadingCountry: true
}

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers:{
        removeCountryDetails: (state) => {
            state.loadingCountry = true,
            state.countryByName = {}
        },
        removeCountriesDispatch: (state) => {
            state.loadingCountries = true,
            state.allCountries = {}
        }
    },
    extraReducers: {

        // fetch one country by name
        [fetchOneCountry.pending]: () =>{
            console.log("pending")
        },
        [fetchOneCountry.fulfilled]: (state, {payload}) => {
            return {...state, loadingCountry: false, countryByName: payload}
        },
        [fetchOneCountry.rejected]: (state)=> {
            return {...state, loadingCountry: "error"}
        },

        // fetch all countries
        [fetchAllCountries.pending]: () =>{
            console.log("pending")
        },
        [fetchAllCountries.fulfilled]: (state, {payload}) => {
            return {...state, loadingCountries: false, allCountries: payload}
        },
        [fetchAllCountries.rejected]: ()=> {
            alert("There is an error ... please try again")
            console.log("rejected")
        },
    }
})

export const {removeCountryDetails , removeCountriesDispatch} = countrySlice.actions;
export const getAllCountries = (state) => state.country.allCountries
export const getCountryByName = (state) => state.country.countryByName
export const loadingCountry = (state) => state.country.loadingCountry
export const loadingCountries = (state) => state.country.loadingCountries

export default countrySlice.reducer