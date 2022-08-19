import React,{useState}from 'react'
import {AiOutlineArrowLeft,AiOutlineArrowRight,AiOutlineCamera} from 'react-icons/ai'

const PropertyGallery = (props) => {
    const [current,setCurrent]=useState(0);
    const length = props.images.length;
    const nextSlide=()=>{
        setCurrent(current===length-1?0:current+1);
        console.log(current);
    }
    const prevSlide=()=>{
        setCurrent(current===0?length-1:current-1);
        console.log(current);
    }  
  return (
    <>
    <div className='gallery position-relative d-flex align-items-center justify-content-center bg-dark shadow-sm p-2 w-100 h-50'>
    <AiOutlineArrowLeft style= {{zIndex:'10',color:'white'}} className='left-arrow position-absolute top-50 start-0 fs-3' onClick={prevSlide}/>
      <span className='position-absolute fs-5 text-white bottom-0 end-0'><AiOutlineCamera/> {length}</span>
        {props.images.length!=0&&
        props.images.map((item,index)=>{
                return (  
                
                    <div key={index}>
                    {index ==current&&  <img style={{width:'100%',height:'300px'}} className ='rounded' src={item} alt="images"/>}
                  </div>
                )
    
            })
        }
           <AiOutlineArrowRight style= {{zIndex:'10',color:'white'}}className='right-arrow position-absolute top-50 end-0 fs-3 ' onClick={nextSlide} />
    </div>
    <div className='d-flex justify-content-start bg-white mt-1'>
    {     props.images.map((item,index)=>{
                return (  
                  props.images.length!=0&&
                    <div key={index}>
                     <img onClick={()=>setCurrent(index)} style={{width:'100px',height:'100px'}} className ={`ms-2 rounded ${index==current?'border border-warning border-3':''}`} src={item} alt="images"/>
                  </div> )   })
    }

    </div>
    </>
  )
}

export default PropertyGallery