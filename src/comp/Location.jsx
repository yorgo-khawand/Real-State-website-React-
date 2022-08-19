import React,{useState,useRef} from 'react'
import { MdOutlineAddAPhoto} from 'react-icons/md'
import {locations} from '../constants/constants'
import InputLabel from '@mui/material/InputLabel';
import { FormHelperText } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import {useSelector} from 'react-redux'
const FormGroup = styled.div`
width:30%;
margin-top: 10px;
margin-bottom: 10px;
@media only screen and (max-width: 768px) {
  width:100%;
}
`
const Content = styled.div`
@media only screen and (max-width: 768px) {
    flex-direction: column;
  }
  `

const Location = ({addListing,handleAddListing,setimages,images,errors}) => {
  const profDetails = useSelector(state=>state.user.user)    
   const ITEM_HEIGHT = 48;
   const ITEM_PADDING_TOP = 8;
   const MenuProps = {
     PaperProps: {
       style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
       },
     },
   };
  return (
    <div>
    <div className='w-100 d-flex justify-content-start align-items-center flex-wrap'>
<FormGroup> <InputLabel sx={{ fontSize:'15px' ,fontWeight:'700',color:'blue'}} id="demo-multiple-name-label">choose location </InputLabel>
<Select     sx={{ width: 300 ,color:'black'}}
labelId="location"
          MenuProps={MenuProps} 
          value ={addListing.location}    
          defaultValue={addListing.location}   
          inputProps={{
            name: 'location',            
          }}
          onChange={ ({target:{name,value}}) =>{handleAddListing(name,value)}}
        >
 <MenuItem disabled defaultValue>
            <em>choose location</em>
          </MenuItem>
         {locations.map((loc,index)=><MenuItem  value = {loc.location} key ={index}><span className='fs-6'>{loc.location}</span></MenuItem>)}
        </Select>
        <FormHelperText sx={{color:'red'}}>{errors.location!=null&&errors.location}</FormHelperText>
</FormGroup>
<FormGroup>
<InputLabel sx={{ fontSize:'15px' ,fontWeight:'700',color:'blue'}} id="city">choose city</InputLabel>
<Select sx={{ width: 300 }}
           labelId="city"
          value ={addListing.city}
          defaultValue={addListing.city}
          MenuProps={MenuProps} 
          inputProps={{
            name:'city',            
          }}
          onChange={ ({target:{name,value}}) =>{handleAddListing(name,value)}}
    
        >
            <MenuItem disabled value="">
            <em>Choose City</em>
          </MenuItem>
         {locations.map((loc)=>
         loc.location ==addListing.location&& loc.cities.map((city,ind)=><MenuItem  value = {city} key ={ind}><span className='fs-6'>{city}</span></MenuItem>))}
        </Select>
        <FormHelperText sx={{color:'blue',fontSize:'30px'}}>{errors.city!=null&&errors.city}</FormHelperText>
</FormGroup>
    </div>
   
      <div className='d-flex justify-content-between mt-2'>
    <p className='fs-5'>Upload Up to 5 photos:<span className="text-danger ms-3">{errors.images && errors.images}</span></p>
    <span onClick={()=>setimages({})} className='fs-6 cursor-pointer fw-bold text-black text-decoration-underline'>reset images</span>
    </div>
 

 <div className='mt-2 label-holder'>
        <label htmlFor='file'  className='label'>
        <input className="d-none" type = 'file' multiple={true} name="file" id='file' onChange={(e)=>{setimages(e.target.files)}}/>
      <div className='d-flex justify-content-start align-items-center flex-wrap'>
      <div style = {{width:'150px',height:'150px'}} className='m-1 bg-light position-relative border'>
{images[0]!=null?<img src={URL.createObjectURL(images[0])} className='w-100 h-100'/>: <MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
{images[0]!=null&&<span style={{position:'absolute',bottom:'10px',left:'0px',height:'25px',pt:'10px'}} className=' bg-info w-100 h-25 text-center text-white'>cover photo</span>}
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {images[1]!=null?<img src={URL.createObjectURL(images[1])} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {images[2]!=null?<img src={URL.createObjectURL(images[2])} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {images[3]!=null?<img src={URL.createObjectURL(images[3])} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {images[4]!=null?<img src={URL.createObjectURL(images[4])} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      </div>
        </label>
    </div>
    <div>
<div className='mt-2 fs-4'>
  review your details (edit your profile to change)
</div>
<Content className='d-flex align-items-center justify-content-between w-100 flex-wrap'>
            <FormGroup>
            <label className='w-100 d-inline-block fw-bolder ' >Name:</label>
            <input style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} className='w-100' name ='name' value={profDetails.name} disabled
            />        
            </FormGroup>
            <FormGroup>
            <label className='w-100 d-inline-block fw-bolder ' >Email:</label>
            <input style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}}className='w-100' name ='email' value={profDetails.email} disabled 
            ></input>          
            </FormGroup>
            <FormGroup>
            <label className='w-100 d-inline-block fw-bolder ' >PhoneNumber:</label>
            <input style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} className='w-100' name ='phoneNumber' value={profDetails.phoneNumber} disabled={profDetails.phoneNumber!=null} onChange={({target:{name,value}}) => {handleAddListing(name,value)}}

            ></input>
                      
            </FormGroup>
            </Content>
            </div>
            </div>
 )
  
}

export default Location