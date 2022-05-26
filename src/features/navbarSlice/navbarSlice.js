import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    
    isOpen: false,
}

export const NavbarSlice = createSlice({
    name: 'Navbar',
    initialState,
    reducers: {
        setIsOpen: (state)=>{
            state.isOpen = !state.isOpen ;
        },
        setIsClose: (state)=>{
            state.isOpen = false; 
        }
    }
});

export const {setIsOpen, setIsClose} = NavbarSlice.actions;
export default NavbarSlice.reducer;

export const getIsOpen = (state)=>state.Navbar.isOpen;
