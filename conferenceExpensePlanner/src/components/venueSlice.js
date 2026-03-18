import { createSlice } from "@reduxjs/toolkit";

export const venueSlice = createSlice({
    name: 'venue',
    initialState:[
        {
        id: 1,
        img: "https://pixabay.com/images/download/chairs-2181916_640.jpg",
        name: "Conference Room (Capacity:15)",
        cost: 3500,
        quantity: 0,
        },
        {
        id: 2,
        img: "https://pixabay.com/images/download/event-venue-1597531_640.jpg",
        name: "Auditorium Hall (Capacity:200)",
        cost: 5500,
        quantity: 0,
        },
        {
        id: 3,
        img: "https://pixabay.com/images/download/convention-center-3908238_640.jpg",
        name: "Presentation Room (Capacity:50)",
        cost: 700,
        quantity: 0,
        },
        {
        id: 4,
        img: "https://pixabay.com/images/download/chairs-2181916_640.jpg",
        name: "Large Meeting Room (Capacity:10)",
        cost: 900,
        quantity: 0,
        },
        {
        id: 5,
        img: "https://pixabay.com/images/download/laptops-593296_640.jpg",
        name: "Small Meeting Room (Capacity:5)",
        cost: 1100,
        quantity: 0,
        },
    ],
    reducers:{
        incrementQuantity: (state, action) =>{
            const venue = state.find(venue => venue.id === action.payload);
            if(venue){
                if(venue.name === 'Auditorium Hall (Capacity:200)' && venue.quantity >= 3){
                    return;
                }
                venue.quantity += 1;
            }
        },
        decrementQuantity: (state, action) =>{
            const venue = state.find(venue => venue.id === action.payload);
            if(venue && venue.quantity > 0){
                venue.quantity -= 1;
            }
        },
    },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;
export default venueSlice.reducer;