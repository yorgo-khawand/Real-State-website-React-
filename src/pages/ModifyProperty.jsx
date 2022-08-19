import React,{useState,useEffect} from 'react'
import Description from '../comp/Description'
import Details from '../comp/Details'
import {locations} from '../constants/constants'
import {Button,FormGroup,InputLabel,Select,MenuItem,Alert,AlertTitle} from '@mui/material'
import axios from 'axios'
import { MdOutlineAddAPhoto} from 'react-icons/md'
import { useSelector ,useDispatch} from 'react-redux'
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
const ModifyProperty = () => {
  const listing = useSelector(state=>state.user.modifiedListing);
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
  })
  const [success,setSuccess] = useState(false)
  const [modified,setModified]=useState(listing );
  const[images,setimages]=useState([]);
 
  
  function modify(e){
    e.preventDefault(); 
    if(validate()){
     const formData = new FormData();
     if(images.length!=0){
     for (let i = 0; i <images.length; i++) {
      formData.append("file[]",images[i]);
    }  
  
  }
 
     formData.append('postid',modified.propertyid)
     console.log(modified.propertyid)
       formData.append('adtitle', modified.adtitle)
       formData.append('price', modified.price)
        formData.append('propertydescp',modified.propertydescp)
         formData.append('description', modified.description)
         formData.append('addescription', modified.addescription)
         formData.append('rentDate', modified.rentDate)
         formData.append('size', modified.size)
         formData.append('bedrooms',  modified.bedrooms)
         formData.append('bathrooms',  modified.bathrooms)
         formData.append('floors',  modified.floors)
         formData.append('furnished',  modified.furnished)
         formData.append('paymentdescp',  modified.paymentdescp)
         formData.append('location', modified.location)
         formData.append('city',  modified.city)
         formData.append('phoneNumber',  modified.phoneNumber)   
    axios({
      url:'http://localhost/realestate/mylisting.php',
      method:"POST",
      data:formData,
      headers: { "Content-Type": "multipart/form-data" },
  
    })
    setSuccess(true)
  }
  }

const validate = ()=>{
  let tmp = {};
  tmp.adtitle = modified.adtitle== ''?'(title is required)':'';
  tmp.price = modified.price == ''?'(price is required)':'';
  tmp.description = modified.description== ''?'(property description is required)':'';
  tmp.floors = modified.floors== '' ||modified.floors < 0?'(size cannot be negative or 0)':'';
  tmp.size = modified.size == '' ||modified.size <0?'(size cannot be negative or 0)':'';
  tmp.furnished = modified.furnished== ''?'(fursnished is required)':'';
  tmp.paymentdescp = modified.paymentdescp== ''?'(payment is required is required)':'';
  setErrors({...tmp})
  return Object.values(tmp).every(x=>x=='')
}
  return (

    <div style={{padding:'40px'}} className='w-100 d-flex flex-column align-items-center'>
      <div className='title p-1 fs-5 fw-bold'>Modify your listing</div>  
         <div className="p-3 w-100 ">
          {console.log(modified)}
          {success ==false?(
          <div >
         <p className='m-1 fs-5 fw-bold text-primary'>property descriptions</p>
         <form onSubmit={(e)=>modify(e)}>  
          <Description  addListing={modified}
                       handleAddListing={(name,value)=>setModified({...modified, [name]:value})}
                       handleCategory={(name,value)=>{setModified({...modified,[name]:value,['bedrooms']:0,['bathrooms']:0,['furnished']:'no',['floors']:'0'})}}
                       handleAdType={(name,value)=>setModified({...modified,[name]:value,['rentDate']:null})}
                       errors={errors}
            />
         
     
              <p className='m-1 fs-5 fw-bold text-primary'>property details</p>
          <Details addListing={modified} handleAddListing={(name,value)=>{setModified({...modified,[name]:value})}} errors={errors}/>
          <p className='m-1 fs-5 fw-bold text-primary'>property location and media</p>
          <div className='w-100 d-flex justify-content-start align-items-center flex-wrap'>
<FormGroup> <InputLabel sx={{ fontSize:'15px' ,fontWeight:'700',color:'blue'}} id="demo-multiple-name-label">choose location</InputLabel>
<Select     sx={{ width: 300 ,color:'black'}}
labelId="location"
          MenuProps={MenuProps} 
          value ={modified.location}    
          defaultValue={modified.location}   
          inputProps={{
            name: 'location',            
          }}
          onChange={ ({target:{name,value}}) =>{setModified({...modified,['location']:value})}}
        >
 <MenuItem disabled defaultValue>
            <em>choose location</em>
          </MenuItem>
         {locations.map((loc,index)=><MenuItem  value = {loc.location} key ={index}><span className='fs-6'>{loc.location}</span></MenuItem>)}
        </Select>
</FormGroup>
<FormGroup sx={{mx:'10px'}}>
<InputLabel sx={{ fontSize:'15px' ,fontWeight:'700',color:'blue',}} id="city">choose city</InputLabel>
<Select sx={{ width: 300 }}
           labelId="city"
          value ={modified.city}
          MenuProps={MenuProps} 
          inputProps={{
            name:'city',            
          }}
          onChange={ ({target:{name,value}}) =>{setModified({...modified,['city']:value})}}
        >
            <MenuItem disabled value="">
            <em>Choose City</em>
          </MenuItem>
         {locations.map((loc)=>
         loc.location ==modified.location&& loc.cities.map((city,ind)=><MenuItem  value = {city} key ={ind}><span className='fs-6'>{city}</span></MenuItem>))}
        </Select>
</FormGroup>
    </div>
          <div className='mt-2 label-holder'>
        <label htmlFor='file'  className='label'>
        <input className="d-none" type = 'file' multiple={true} name="file" id='file' onChange={(e)=>{setimages(e.target.files)}}/>
      <div className='d-flex justify-content-start align-items-center flex-wrap'>
      <div style = {{width:'150px',height:'150px'}} className='m-1 bg-light position-relative border'>
{modified.images[0]!=null &&images.length==0?<img src={modified.images[0]} className='w-100 h-100'/>:images[0]!=null?<img src={URL.createObjectURL(images[0])} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
{modified.images[0]!=null&&<span style={{position:'absolute',bottom:'10px',left:'0px',height:'25px',pt:'10px'}} className=' bg-info w-100 h-25 text-center text-white'>cover photo</span>}
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {modified.images[1]!=null&&images.length==0?<img src={modified.images[1]} className='w-100 h-100'/>:images[1]!=null?<img src={URL.createObjectURL(images[1])} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {modified.images[2]!=null&&images.length==0?<img src={modified.images[2]} className='w-100 h-100'/>:images[2]!=null?<img src={URL.createObjectURL(images[2])} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/>}
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {modified.images[3]!=null&&images.length==0?<img src={modified.images[3]} className='w-100 h-100'/>:images[3]!=null?<img src={URL.createObjectURL(images[3])} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      <div style = {{width:'150px',height:'150px'}} className='bg-light m-1 position-relative border'>
      {modified.images[4]!=null&&images.length==0?<img src={modified.images[4]} className='w-100 h-100'/>:images[4]!=null?<img src={URL.createObjectURL(images[4])} className='w-100 h-100'/>:<MdOutlineAddAPhoto style={{width:'50px',height:'50px',top:'35%',left:'35%'}} className='position-absolute text-dark  m-auto '/> }
      </div>
      </div>
        </label>
    </div>
    <Button disabled={success} variant = "contained" color="primary" sx={{mt:3}} onClick={modify}>Save changes</Button>
    </form>
   </div>):
   <Alert severity="success">
   <AlertTitle>Success</AlertTitle>
   listing modified successfully — <strong>check it out!</strong>
 </Alert>
   }


          </div>
    </div>
  )
}

export default ModifyProperty