import React from 'react'

const PropertyDescriptions = (props) => {
  return (
    <div style = {{margin:'20px 0px'}}className='p-3 w-100 bg-white shadow-sm rounded'>
      <span className=' fw-bold fs-5'>Description</span>
      <div className='info-content p-1 d-block justify-content-between align-items-center'>
     {props.desc}
      </div>
        </div>
  )
}

export default PropertyDescriptions