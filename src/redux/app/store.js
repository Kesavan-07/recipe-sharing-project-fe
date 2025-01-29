import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/auth/loginSlice";
import userReducer from "../features/auth/userSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer
    }
});

export default store;