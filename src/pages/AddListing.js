
import React, { useState } from 'react'
import Description from '../comp/Description'
import Details from '../comp/Details'
import Location from '../comp/Location'
import {nanoid} from 'nanoid'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from 'axios'
import { Alert,AlertTitle,Snackbar } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const AddListing = () => {
  const user = useSelector(state=>state.user.user);
    const [currentPage,setCurrentPage]= useState(0);

    const [images,setimages]=useState([]);
    const [success,setsuccess]=useState(false);
    const[errors,setErrors]=useState({
      adtitle:null,
      price:null,
      description:null,
      rentDate:null,
      size:null,
      bedrooms:null,
      bathrooms:null,
      floors:null,
      furnished:null,
      paymentdescp:null,
      location:null,
      city:null,
      phoneNumber:null,
      images:null
    })
    const [addListing,setAddlisting] = useState({
      postid:nanoid(),
      adtitle:'',
      price:'',
      propertydescp:'Appartment',
      description:'',
      addescription:'Rental',
      rentDate:'',
      size:null,
      bedrooms:'',
      bathrooms:'',
      floors:null,
      furnished:'',
      paymentdescp:'',
      location:'',
      city:'',
      phoneNumber:'',
      rentDate:'daily',
    })
    const handleValidate=()=>{
  if(currentPage==0){
    let tmp = {};
      tmp.adtitle = addListing.adtitle== ''?'(title is required)':'';
      tmp.price = addListing.price == ''?'(price is required)':'';
      tmp.description = addListing.description== ''?'(property description is required)':'';
      setErrors({...tmp})
      if(tmp.adtitle.length==0&&tmp.description.length==0&&tmp.price.length==0){
      setCurrentPage((prevState)=>prevState==Pages.length-1?Pages.length-1:prevState+1)
      }
 
    }
    if(currentPage==1){
      let tmp = {};
        tmp.floors = addListing.floors== ''?'(floor is required)':'';
        tmp.floors = addListing.floors <= 0?'(floor cannot be negative)':'';
        tmp.size = addListing.size == ''?'(size is required)':'';
        tmp.size = addListing.size <= 0?'(size cannot be negative or 0)':'';
        tmp.furnished = addListing.furnished== ''?'(fursnished is required)':'';
        tmp.paymentdescp = addListing.paymentdescp== ''?'(payment is required is required)':'';
        setErrors({...tmp})
        if(tmp.floors.length==0&&tmp.size.length==0&&tmp.size>0&&tmp.floors>0&&tmp.furnished.length==0,tmp.paymentdescp.length==0){
        setCurrentPage((prevState)=>prevState==Pages.length-1?Pages.length-1:prevState+1)
        }
      }
      if(currentPage == 2){
        let tmp={};
        tmp.location = addListing.location == ''?'location is required':'';
        tmp.city = addListing.city ==''?'city is required':'';
        tmp.images = images.length == 0?'images are required (min one image)':'';
        setErrors({...tmp});
        return Object.values(tmp).every(x=>x=='')
      }
    }
    function upload(e){
      e.preventDefault(); 
      if(handleValidate()){
       const formData = new FormData();
       for (let i = 0; i < images.length; i++) {
        formData.append("file[]", images[i]);
      }  
      formData.append('userid', user.userid)
      formData.append('postid', addListing.postid)
        formData.append('adtitle', addListing.adtitle)
        formData.append('price', addListing.price)
        formData.append('propertydescp', addListing.propertydescp)
         formData.append('description', addListing.description)
         formData.append('addescription', addListing.addescription)
         formData.append('rentDate', addListing.rentDate)
         formData.append('size', addListing.size)
         formData.append('bedrooms', addListing.bedrooms)
         formData.append('bathrooms', addListing.bathrooms)
         formData.append('floors', addListing.floors)
         formData.append('furnished', addListing.furnished)
         formData.append('paymentdescp', addListing.paymentdescp)
         formData.append('location', addListing.location)
         formData.append('city', addListing.city)
         formData.append('phoneNumber', addListing.phoneNumber)   
      axios({
        url:'http://localhost/realestate/addlisting.php',
        method:"POST",
        data:formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res)=>{
        setsuccess(true)
      }).catch((err)=>{
       console.error(err);
      })
      }
      }
    
    console.log(addListing);
    const PageDisplay =(page)=>{
  if (page == 0) return <Description addListing={addListing} handleAddListing = {(name,value)=>{setAddlisting({...addListing,[name]:value})}}handleCategory={(name,value)=>{setAddlisting({...addListing,[name]:value,['bedrooms']:'0',['bathrooms']:'0',['furnished']:'no',['floors']:'0'})}} handleAdType={(name,value)=>setAddlisting({...addListing,[name]:value,['rentDate']:null})} errors={errors} />   
     if(page ==1) return <Details addListing={addListing} handleAddListing = {(name,value)=>{setAddlisting({...addListing,[name]:value})}} errors={errors}/>
      if(page == 2) return <Location addListing={addListing} handleAddListing = {(name,value)=>{setAddlisting({...addListing,[name]:value})}} images={images} setimages={(files)=>setimages(files)} errors={errors} />
      }
    
  const Pages = [' Property description',' Property details','Property location And Media' ];
  return (
  <div style={{padding:'40px'}} className='w-100 bg-white  rounded shadow'  >
      <div style={{fontFamily:"bold"}} className='title p-1 fs-4 '>Add Listing</div>
   
      <Stepper activeStep={currentPage} alternativeLabel >
        {Pages.map((label,index) => { 
           return(
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>)
})}
      </Stepper>
      {success==false?(    
<div className ="add p-3">
    <p className='m-1 fs-5 fw-bold text-center'>{Pages[currentPage]}</p>
   <form onSubmit={(e)=>upload(e) } encType='multipart/form-data'>
  
    {PageDisplay(currentPage)}
   
    <div className='d-flex justify-content-end'>
   <button  disabled ={currentPage==0}className='me-1 btn btn-primary'type = 'button'onClick={()=>setCurrentPage((prevState)=>prevState -1)}>prev</button>
   {currentPage==2?<input className='me-1 btn btn-primary'type='submit' /> :
   <button  className='me-1 btn btn-primary' type='button' onClick={handleValidate}>next</button>  
  }
   </div>
   </form>
</div>
  ) :(
<div class="alert alert-success mt-3" role="alert">
  <h4 class="alert-heading">Well done!</h4>
  <p>listing is successfully added ,thank you <span className='fw-bold'>{user.name}</span> for trusting us. </p>
  <hr/>
  <p class="mb-0">The post will appear when the administrator accepts it,go to <Link to="/">home page</Link>?</p>
</div>
)
}
  </div>
  )
}

export default AddListing