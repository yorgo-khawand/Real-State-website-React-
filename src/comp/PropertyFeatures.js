import React from 'react'

const PropertyFeatures = (props) => {
  return (
    <div style={{ margin: '20px 0px' }} className='w-100 p-3 bg-white shadow-sm rounded'>
      <span className=' fw-bold fs-5'>Property features</span>
      <div className='content d-flex justify-content-between p-1 h-auto'>
        <div className='Info_item '>
          <p>   <span className='d-inline-block fw-bold'>bedrooms:</span>{props.bedrooms}</p>
          <p>   <span className='d-inline-block fw-bold'>bathrooms:</span>{props.bathrooms}</p>
        </div>
        <div className='Info_item '>
          <p>   <span className='d-inline-block fw-bold'>condition:</span>{props.condition} </p>
          <p>   <span className='d-inline-block fw-bold'>floor:</span>{props.floor}</p>
        </div>
        <div className='Info_item '>
          <p>   <span className='d-inline-block fw-bold'>property type:</span>{props.propertyType} </p>
          <p>   <span className='d-inline-block fw-bold'>furnished:</span>{props.furnished}</p>
        </div>
      </div>
    </div>
  )
}

export default PropertyFeatures