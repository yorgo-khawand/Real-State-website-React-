import React from 'react'
import styled from 'styled-components'
import { Alert } from '@mui/material'
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
const Details = ({addListing,handleAddListing,errors}) => {
  return (
    <div className='m-1'>
      
        <Content className='d-flex justify-content-between align-items-center flex-wrap w-100'>
           {addListing.propertydescp =='Appartment' && (
           <>
           <FormGroup>
            <label className='w-100 d-inline-block fw-bolder ' >Rooms</label>
            <select style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} className="w-100 bg-light border" onChange={({target:{name,value}})=>{handleAddListing(name,value)}} name='bedrooms' value={addListing.bedrooms}>
            { Array.from({length: 10}, (i,v) =>(<option className='p-2 text-capitalize ' key={v} value={v} >{v}</option>) )}
         </select>
            </FormGroup>
            <FormGroup>
            <label className='w-100 d-inline-block fw-bolder ' >bathrooms</label>
            <select style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} className="w-100 bg-light border" name='bathrooms' onChange={({target:{name,value}})=>handleAddListing(name,value)} value={addListing.bathrooms}>
            { Array.from({length: 10}, (i,v) =>(<option className='p-2 text-capitalize ' key={v} value={v} >{v}</option>) )}
         </select>
            </FormGroup>
            <FormGroup>
            <label className='w-100 d-inline-block fw-bolder' >floor<span style={{color:'red'}}>{errors.floors!=null&&errors.floors}</span></label>
            <input style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} className="w-100 bg-white border" type='number' onChange={({target:{name,value}})=>handleAddListing(name,value)} name='floors' value={addListing.floors}></input>
            </FormGroup>
            <FormGroup>
                <label className='w-100 d-inline-block fw-bolder'  htmlFor='furnished' >furnished<span style={{color:'red'}}>{errors.furnished!=null&&errors.furnished}</span></label>
                <div className="form-check form-check-inline">
<input className="form-check-input" type="radio"  name='furnished' checked={addListing.furnished=='yes'} onClick={()=>handleAddListing('furnished','yes')}  />
  <label className="form-check-label" for="inlineRadio1">yes</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name='furnished' checked={addListing.furnished=='no'} onClick={()=>handleAddListing('furnished','no')}  />
  <label className="form-check-label" for="inlineRadio2">no</label>
</div>
            </FormGroup>
            </>)}
            <FormGroup>
            <label className='w-100 d-inline-block fw-bolder' >size  <span style={{color:'red'}}>{errors.size!=null&&errors.size}</span></label>
            <input style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer'}} className="w-100 bg-white border" type='number' onChange={({target:{name,value}})=>handleAddListing(name,value)} name='size' value={addListing.size}></input>
            </FormGroup>
            <FormGroup>
                <label className='w-100 d-inline-block fw-bolder' >Payment method <span style={{color:'red'}}>{errors.paymentdescp!=null&&errors.paymentdescp}</span></label>
                <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="paymentdescp" checked={addListing.paymentdescp=='cash'} onClick={()=>handleAddListing('paymentdescp','cash')}/>
  <label className="form-check-label" for="inlineRadio1">cash</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="paymentdescp"  checked={addListing.paymentdescp=='cheque'} onClick={()=>handleAddListing('paymentdescp','cheque')}/>
  <label className="form-check-label" for="inlineRadio2">sheque</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="paymentdescp"  checked={addListing.paymentdescp=='other'} onClick={()=>handleAddListing('paymentdescp','other')}/>
  <label className="form-check-label" for="inlineRadio2">other</label>
</div>
            </FormGroup>
        </Content>
    </div>
  )
}

export default Details