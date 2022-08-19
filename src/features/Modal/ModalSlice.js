import { createSlice } from "@reduxjs/toolkit";

const ModalSlice= createSlice({
    name:'modal',
    initialState:{
        displayModal:false
    },reducers:{
        openModal:(state)=>{
       
            console.log(state.displayModal)
            state.displayModal = true
        },
        closeModal:(state)=>{
         
            state.displayModal = false
        }
    }
})
export default ModalSlice.reducer
export const  {openModal,closeModal} = ModalSlice.actions;