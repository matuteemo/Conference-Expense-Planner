import { configureStore } from "@reduxjs/toolkit";
import venueReducer from "./venueSlice";
import avReducer from "./avSlice";
import mealReducer from "./mealSlice";
export default configureStore({
    reducer: {
        venue: venueReducer,
        av : avReducer,
        meal: mealReducer,
    },
});

// This code creates a global redux store using the configureStore tool from redux toolkit, so all the components in the app can access the state managed by the venueReducer()