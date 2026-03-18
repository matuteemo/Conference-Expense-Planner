import React from "react";
import { createSlice } from "@reduxjs/toolkit";
export const mealSlice = createSlice({
    name: 'meal',
    initialState: [
        {
            id: 1,
            name: "Breakfast",
            cost: 15,
            quantity: 0,
            selected: false,
        },
        {
            id: 2,
            name: "Lunch",
            cost: 25,
            quantity: 0,
            selected: false,
        },
        {
            id: 3,
            name: "Dinner",
            cost: 35,
            quantity: 0,
            selected: false,
        },
        {
            id: 4,
            name: "Snack",
            cost: 10,
            quantity: 0,
            selected: false,
        }
    ],
    reducers: {
        toggleMealSelection: (state, action) => {
            state[action.payload].selected =  !state[action.payload].selected;
        },
    },
});

export const {toggleMealSelection} = mealSlice.actions;
export default mealSlice.reducer;

