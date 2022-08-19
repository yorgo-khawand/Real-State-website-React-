import { toUnitless } from '@mui/material/styles/cssUtils'
import {createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getSavedPost= createAsyncThunk('savedposts/getSavedPost',
async(id)=>{
 return axios({url:`http://localhost/realestate/savedposts.php?id=${id}`}).then(response=>response.data).catch(error=>console.log(error));
})

export const UpdateSavedPost= createAsyncThunk('savedposts/UpdateSavedPost',
async(form)=>{
 return axios({method:'POST',url:'http://localhost/realestate/savedposts.php',data:form}).then(response=>response.data).catch(error=>console.log(error));
})


export const RemoveSavedPost= createAsyncThunk('savedposts/RemoveSavedPost',
async(favoritepostid)=>{
 return axios.delete(`http://localhost:80/realestate/savedposts.php/${favoritepostid}`).then(response=>response.data).catch(error=>console.log(error));
})
const SavedpostSlice = createSlice({
    name:'savedposts',
    initialState:{
    isLoading:true,
    data:[]
    },
    reducers:{
    updatePost:(state,{payload})=>{
    state.data.push(payload);
    },
    reset:(state)=>{
        state.data=[];
    }
    },
    extraReducers:(builder)=>{
    builder
    .addCase(getSavedPost.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(getSavedPost.fulfilled,(state,{payload})=>{
        state.data=null;
state.data = payload;
console.log(payload)
state.isLoading = false;
    })
    .addCase(UpdateSavedPost.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(UpdateSavedPost.fulfilled,(state,{payload})=>{
        state.isLoading = false;
    state.data.push(payload);
                })
                .addCase(RemoveSavedPost.fulfilled,(state,{payload})=>{
                    console.log('deletedvalue'+payload +'deletedvalue')
                    const posts=  state.data.filter(post=>post.favoriteid != payload);
                  state.data = posts;
                                })
       
    }
})
export const savedPosts=(state)=>state.data;
export default  SavedpostSlice.reducer;
export const {reset} = SavedpostSlice.actions;