import { configureStore } from '@reduxjs/toolkit'

import propertySlice from '../features/properties/propertySlice'  
import userSlice from '../features/User/userSlice'
import ModalSlice from '../features/Modal/ModalSlice'
import SavedpostSlice from '../features/SavedPosts/SavedpostSlice'
export const store =configureStore({
      reducer:{
property:propertySlice, 
user:userSlice,  
modal:ModalSlice,
savedposts:SavedpostSlice
      }
  })