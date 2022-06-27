import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState : [],
    reducers: {
        register: (state, action) => {
            state.push(action.payload);
        },

        logout: (state) => {
            state.length = 0;
        }
    },
});

const { actions, reducer } = userSlice;
export const { register, logout } = actions;
export default reducer;