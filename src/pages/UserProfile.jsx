import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import { deepOrange } from '@mui/material/colors';
import { useSelector,useDispatch } from 'react-redux'
import {Avatar,Typography,Stack} from '@mui/material'
import {modifyprof} from '../features/User/userSlice'
import axios from 'axios'
const Content = styled.div`
 @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`
const FormGroup = styled.div`
width:48%;
margin-top: 10px;
@media only screen and (max-width: 768px) {
  width:100%;
}
`
const UserProfile = () => {
  const {userid,name,email,phoneNumber} = useSelector(state=>state.user.user);
  const [userdata,setuserdata]=useState({name:name,email:email,phoneNumber:phoneNumber})
  const dispatch = useDispatch();
  const form=new FormData();
  form.append('id',userid);
  form.append('name',userdata.name);
  form.append('email',userdata.email);
  form.append('phoneNumber',userdata.phoneNumber);
  const updateuser=async(e)=>{
   e.preventDefault();
   dispatch(modifyprof(form))
  }
  return (
    <div style={{padding:'40px',backgroundColor:'#F3F7FF'}} className='shadow rounded'>
      <form onSubmit={updateuser}>
        <div className='header'>
          <h2 style={{fontFamily:'bold'}}>Profile</h2>
          <Stack direction='column' alignItems='center'>
          <Avatar sx={{fontSize:'30px', width:'80px',height:'80px',bgcolor: deepOrange[500] }}>{userdata.name.substr(0,1)}</Avatar>
        <Typography variant="h6" sx={{fontFamily:'bold'}}>{name}</Typography>
        <Typography variant="subtitle1" sx={{fontWeight:'bold'}}>{email}</Typography>
          </Stack>

        </div>
        <div style={{marginTop:'40px'}} className='content'>
          <div className='fs-5'>Personal Info:</div>
          <Content className='d-flex w-100 flex-wrap w-100 justify-content-between'>
<FormGroup>
<label className='w-100 d-inline-block fw-bolder ' >Name</label>
<input style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} type="name" defaultValue={userdata.name} onChange={(e)=>{setuserdata({...userdata,['name']:e.target.value})}} className="w-100 bg-white border"></input>
</FormGroup>
<FormGroup>
<label className='w-100 d-inline-block fw-bolder ' >Email</label>
<input style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} type="email" defaultValue={userdata.email} onChange={(e)=>{setuserdata({...userdata,['email']:e.target.value})}} className="w-100 bg-white border"></input>
</FormGroup>
<FormGroup>
<label className='w-100 d-inline-block fw-bolder ' >Phone(This is the number for buyers contacts)</label>
<input style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} type="number" defaultValue={userdata.phoneNumber} onChange={(e)=>{setuserdata({...userdata,['phoneNumber']:e.target.value})}} className="w-100 bg-white border"></input>
</FormGroup>

          </Content>
        </div>
        <div className='text-end'>
          <button className=' mt-2 btn btn-primary' type='submit'>save changes</button>
        </div>
      </form>

    </div>
  )
}

export default UserProfile