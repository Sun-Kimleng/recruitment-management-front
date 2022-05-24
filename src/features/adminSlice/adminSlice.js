import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
}

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        createAdmin: (state, {payload})=>{
            state.users = payload
        }
    }
});

export const {createAdmin} = AdminSlice.actions;
export default AdminSlice.reducer;

export const getUser = (state)=>state.admin.users;