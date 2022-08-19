
import {createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import {getSavedPost} from '../SavedPosts/SavedpostSlice';
import axios from 'axios'

export const login = createAsyncThunk('user/login',
async(userData,thunkAPI)=>{
 const {data} = await axios({method:'post',url:'http://localhost/realestate/login.php',data:userData});
 const resp = data;
 thunkAPI.dispatch(getSavedPost(data.userid))
 return resp;
})
export const modifyprof = createAsyncThunk('user/modifyprofile',
async(userData)=>{
 const {data} = await axios({method:'post',url:'http://localhost/realestate/myprofile.php',data:userData});
 return data;
})
export const getUserListing= createAsyncThunk('user/getUserListing',
async(id)=>{
 return axios({url:`http://localhost/realestate/mylisting.php?id=${id}`}).then(response=>response.data).catch(error=>console.log(error));
})

export const DeleteUserListing= createAsyncThunk('user/DeleteUserListing',
async(id)=>{
  console.log(id)
 return axios.delete(`http://localhost/realestate/mylisting.php/${id}`).then(response=>response.data).catch(error=>console.log(error));
})

export const UpdateSavedPost= createAsyncThunk('user/UpdateSavedPost',

async(userid,propertyid)=>{
 
 return axios({method:'post',url:'http://localhost/realestate/savedposts.php',data:{userid,propertyid}}).then(response=>response.data).catch(error=>console.log(error));
})
export const RemoveSavedPost= createAsyncThunk('user/RemoveSavedPost',
async(userid,propertyid)=>{
 return axios({method:'post',url:'http://localhost/realestate/savedposts.php',data:userid,propertyid}).then(response=>response.data).catch(error=>console.log(error));
})
const userSlice = createSlice({
    name:'user',
    initialState :{
     user:null,
     isSuccess:false,
     error:null,
  myListings:{
    isLoading:true,
    data:[]
  },
    modifiedListing:{},
  
    },
    
    reducers:{
      logout:(state)=>{
      state.user=null;
      state.isSuccess = false; 
      state.myListings.data = [];
      state.modifiedListing = null;
      state.error= null;
      },
      modifyprofile:(state,{payload})=>{
state.user=[{...state.user,payload}];
      },

    SelectedListing:(state,action)=>{
      console.log('selected listing changed to '+ action.payload.selectedProp);
    state.myListings.data.map((prop)=>{
      if(prop.propertyid == action.payload.selectedProp){
       state.modifiedListing =prop;
       console.log(prop)
      }
    }             )
    }

      },
    extraReducers:(builder)=>{
      builder  
      .addCase(login.fulfilled,(state,{payload})=>{ 
        if(payload !== 'Username or password not found') { 
        state.isSuccess = true;
        state.user = payload;
           }
        else {
          state.isSuccess = false;
          state.error = payload;
        }
      })
      .addCase(modifyprof.fulfilled,(state,{payload})=>{    
        console.log(payload)
        state.user = payload;  
      })
      .addCase(login.rejected,(state)=>{
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(getUserListing.pending,(state)=>{
        state.myListings.isLoading=true;
      
      })
      .addCase(getUserListing.fulfilled,(state,{payload})=>{
        console.log(payload)
        state.myListings.isLoading=false;
        state.myListings.data = payload
      })
      .addCase(DeleteUserListing.fulfilled,(state,{payload})=>{
        console.log(payload)
        const posts = state.myListings.data.filter((post)=>post.propertyid != payload);
        console.log(posts)
      state.myListings.data = posts;
                    }) 
 
    
    }

    }
)

export default  userSlice.reducer;
export const {logout,modifyprofile,SelectedListing} =userSlice.actions;
