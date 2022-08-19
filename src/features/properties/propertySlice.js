
import {createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchBuyProperties = createAsyncThunk(
    'property/fetchBuyProperties',
    async(form) =>{
        const params = new URLSearchParams(form);
        const {data}= await axios.get(`http://localhost/realestate/buysell.php?adType=buy&${params}`)
          return data;
    }
)
export const fetchRentalProperties = createAsyncThunk(
    'property/fetchRentalProperties',
    async(form) =>{
        const params = new URLSearchParams(form);
        const {data}= await axios.get(`http://localhost/realestate/buysell.php?adType=rent&${params}`)
          return data;
    }
)
const propertySlice = createSlice({
    name:'property',
    initialState :{
        loading:null,
        data:[],
    },
    reducers:{  },
    extraReducers:{
    [fetchBuyProperties.pending](state){
state.loading = 'pending'
        },
    [fetchBuyProperties.fulfilled](state,{payload}){
            state.data=null;
            state.loading = 'fulfilled';
            state.data =payload
                    },
                                [fetchRentalProperties.pending](state){
                                    state.loading = 'pending'
                                            },
                                        [fetchRentalProperties.fulfilled](state,{payload}){
                                                state.data=null;
                                                state.loading = 'fulfilled';
                                                state.data =payload
                                                        },
                                    
    }


})

export default propertySlice.reducer