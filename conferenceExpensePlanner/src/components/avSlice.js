import {createSlice} from "@reduxjs/toolkit";

export const avSlice = createSlice({
    name: 'av',
    initialState: [
        {
            id: 1,
            img: "https://pixabay.com/images/download/business-20031_640.jpg",
            name: "Projectors",
            cost: 200,
            quantity: 0,
        },
        {
            id: 2,
            img: "https://pixabay.com/images/download/speakers-4109274_640.jpg",
            name: "Speaker",
            cost: 35,
            quantity: 0,
        },
        {
            id: 3,
            img: "https://pixabay.com/images/download/public-speaking-3926344_640.jpg",
            name: "Microphones",
            cost: 45,
            quantity: 0,
        },
        {
            id: 4,
            img: "https://pixabay.com/images/download/whiteboard-2903269_640.png",
            name: "Whiteboards",
            cost: 80,
            quantity: 0,
        },

        {
            id: 5,
            img: "https://pixabay.com/images/download/signpost-235079_640.jpg",
            name: "Signage",
            cost: 80,
            quantity: 0,
        },
    ],
    reducers: { 
        incrementQuantity: (state, action ) => {
            const av = state.find(av => av.id === action.payload);
            if(av){
                av.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const av = state.find(av => av.id === action.payload);
            if(av && av.quantity > 0){
                av.quantity -= 1;
            }
        },
    }
});

export const {incrementQuantity, decrementQuantity} = avSlice.actions;
export default avSlice.reducer;