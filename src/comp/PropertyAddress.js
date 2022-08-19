import React from 'react'

const PropertyAddress = (props) => {
  return (
    <div style = {{margin:'20px 0px'}}className='w-100 p-3 bg-white shadow-sm rounded'>
        <span className=' fw-bold fs-5'>Address </span>
        <div className='d-flex justify-content-between align-items-center p-1'>
            <div className='info_item'>
                <p><span className='d-inline-block fw-bold'>Country:</span> Lebanon</p>
                <p><span className='d-inline-block fw-bold'>location:</span>{props.location} </p>
            </div>
            <div style ={{marginBottom:'auto'}} className='info_item '>
                <p><span className='d-inline-block fw-bold'>city:</span>{props.city} </p>
            </div>
        </div>

        </div>

  )
}

export default PropertyAddress