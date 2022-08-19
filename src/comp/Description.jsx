import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FormHelperText } from '@mui/material';
import Alert from '@mui/material/Alert'
const Content = styled.div`
@media only screen and (max-width: 768px) {
    flex-direction: column;
  }
  `
  const FormGroup = styled.div`
  width:48%;
  margin-top: 20px;
  @media only screen and (max-width: 768px) {
    width:100%;
  }
  `
  
const Description = ({addListing,handleAddListing,handleCategory,handleAdType,errors}) => {

  return (
    <div className='content'>
        <Content className='d-flex align-items-center justify-content-between w-100 flex-wrap'>
            <FormGroup>
            <label className='w-100 d-inline-block fw-bolder ' >Property Title <span style={{color:'red'}}>{errors.adtitle!=null&&errors.adtitle}</span></label>
            <input style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}}  name ='adtitle' value={addListing.adtitle} 
             onChange={({target:{name,value}})=>{handleAddListing(name,value)}} className="w-100 bg-white border"></input>     
            </FormGroup>
            <FormGroup>
         <InputLabel  sx={{color:'black',fontWeight:'bolder'}}htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput  fullWidth required
            id="outlined-adornment-amount"
             value={addListing.price}
             name="price"
            
            onChange={({target:{name,value}})=>handleAddListing(name,value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="price"
            type='number'
          />
            <FormHelperText sx={{color:'red',fontSize:'15px',fontWeight:'bold'}}>{errors.price!=null&&errors.price}</FormHelperText>
            </FormGroup>
            <FormGroup>
            <label className='w-100 d-inline-block fw-bolder ' >Category <span>(required)</span></label>
        <select style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} defaultValue={'choose category'} className="w-100 bg-light border" name='propertydescp' value={addListing.propertydescp} onChange={({target:{name,value}})=>{value='land'?handleCategory(name,value):handleAddListing(name,value)}}>
<option value={'Appartment'} className='p-2 text-capitalize ' >Appartment</option>
<option value={'Land'}className='p-2 text-capitalize '>land</option>
         </select>
            </FormGroup>
            <FormGroup>
            <label className='w-100 d-inline-block fw-bolder ' >Type <span>(required)</span></label>
         <select style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} className="w-100 bg-light border" name='addescription' value={addListing.addescription} onChange={({target:{name,value}})=>{value='Sale'?handleAdType(name,value):handleAddListing(name,value)}}>
<option value='Rental'className='p-2 text-capitalize ' >Rental</option>
<option value='Sale' className='p-2 text-capitalize '>Sale</option>
         </select>
            </FormGroup>
 {console.log(addListing)}          
{addListing.addescription=='Rental' &&(
  <FormGroup style={{marginBottom:'auto'}}>
    <label className='w-100 d-inline-block fw-bolder ' >rent date</label>
    <select style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} className="w-100 bg-light border" name='rentDate' value={addListing.rentDate} onChange={({target:{name,value}})=>handleAddListing(name,value)}>
    <option className='p-2 text-capitalize '>daily</option>
    <option className='p-2 text-capitalize '>weekly</option>
    <option className='p-2 text-capitalize ' >Monthly</option>
    <option className='p-2 text-capitalize '>yearly</option>
    </select>
    </FormGroup>
)}
            <FormGroup>
            <label className='w-100 d-inline-block fw-bolder ' >Description <span style={{color:'red'}}>{errors!=null&&errors.description}</span></label>  
            <textarea style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} className="bg-white border w-100"cols="30" rows="10" name='description' value={addListing.description} onChange={({target:{name,value}})=>handleAddListing(name,value)} ></textarea>    
            </FormGroup>
        </Content>
        
    </div>
  )
}

export default Description