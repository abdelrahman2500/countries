import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: "dark"
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        dark: (state) => {
            state.value = "dark"
        },
        light: (state) => {
            state.value = "light"
        },
    }
})

export const {dark, light} = themeSlice.actions;
export default themeSlice.reducer