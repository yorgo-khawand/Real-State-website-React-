import React,{useState} from 'react'
import {MdOutlineAddAPhoto} from 'react-icons/md'

const PropertyMedia = () => {
    const [selectedImages,setSelectedImages]= useState([])
    const imagehandlechange=(e)=>{
       
        if(e.target.files){
          console.log(e.target.files);
            const fileArray = Array.from(e.target.files).map((file)=>URL.createObjectURL(file));
            setSelectedImages((prevImages)=>prevImages.concat(fileArray))   

         Array.from(e.target.files).map((file)=>URL.revokeObjectURL(file))
        }
        }
  return (
    <div>
<div className='heading fs-4'>
   Upload Up to 5 photos
</div>

<div>
    <div className='mt-2 label-holder'>
        <label htmlFor='file'  className='label'>
        <input className="d-none" type = 'file' multiple={true} id ='file' onChange={imagehandlechange}/>
      <div className='d-flex justify-content-start align-items-center flex-wrap'>
      <div style = {{width:'150px',height:'150px'}} className='m-1 bg-light position-relative border'>
{selectedImages[0]!=null?<img src={selectedImages[0]} className='w-100 h-100'/>: <MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {selectedImages[1]!=null?<img src={selectedImages[1]} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {selectedImages[2]!=null?<img src={selectedImages[2]} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {selectedImages[3]!=null?<img src={selectedImages[3]} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {selectedImages[4]!=null?<img src={selectedImages[4]} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      </div>
        </label>
    </div>
</div>
    </div>
  )
}

export default PropertyMedia