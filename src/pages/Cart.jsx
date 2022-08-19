import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux';
import Img from '../assets/images/noDataFound.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import{GoLocation} from 'react-icons/go'
import {AiOutlineCamera} from 'react-icons/ai'
import { FaBath, FaBed } from 'react-icons/fa';
import{BsGridFill,BsCalendarDate} from 'react-icons/bs'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {Typography,Box} from '@mui/material'
const Cart = () => {
    const [cart,setcart]=useState(null);
    const {user} = useSelector(state=>state.user);
    let totalprice = 0
    const navigate = useNavigate();
    useEffect(() => {
        axios({url:`http://localhost/realestate/cart.php?id=${user.userid}`}).then(response=>setcart(response.data)).catch(error=>console.log(error));
      },[]);
      const deletepost = (cartid)=>{
        axios.delete(`http://localhost:80/realestate/cart.php/${cartid}`).then(response=>
        {
          const posts=cart.filter(post=>post.cartid != response.data);
          setcart(posts)
        }
        ).catch(error=>console.log(error));
      }
      {cart!=null && cart.map(({price})=>{totalprice+=Number(price)})}
    return (  
    <div style={{padding:'20px',minHeight:'90vh',backgroundColor:'#F3F7FF'}} className='shadow rounded'>
<div className = 'd-flex justify-content-between align-items-center'>
<Typography variant = "h5" sx={{fontFamily:'bold',padding:'20px',color:'darkblue'}}>My cart</Typography>
<Typography variant = "h5" sx={{textAlign:'right',fontFamily:'bold',darkblue:'darkblue'}}>total price : {totalprice} $</Typography>
</div>
<div className="list-3 ">

{cart!= null && cart!=0  ?( cart.map((list,index)=>{       
        return (
<div style={{height:'auto'}} className="card shadow-sm mb-3 w-75 border-0"  >
    <div style={{height:'170px'}} className="row g-0">
      <div  className=" position-relative col-sm-4 h-100">
        <img src={list.images[0]} className="w-100 h-100 rounded-start" alt="..."/>
        <span className='position-absolute fs-6 text-white bottom-0 end-0 me-1'>7<AiOutlineCamera/> </span>
        <span style={{position:'absolute',top:'5px',left:'0px'}} className="badge rounded-0 p-1 bg-warning text-dark">{list.propertydescp}</span>
      </div>
      <div className="col-sm-8 p-1 pb-0">

          <div className='d-flex justify-content-between align-items-center'>
          <h5 className="card-title">{list.adtitle}</h5>
          <button type="button" className="btn-close pe-2 outline-none" aria-label="Close" onClick={()=>deletepost(list.cartid)}></button>
         </div>
         <span className="d-block text-warning">{list.price}$</span>
         <span  className="d-block  fs-6" >{list.description.substr(0,100)}</span>
         <div className="d-flex w-100 align-items-center p-1 justify-content-between ">
         <span className='text-black-50 '> {list.bedrooms}  <FaBed/> &nbsp; {list.bathrooms}<FaBath/>&nbsp; {list.size} <BsGridFill/></span>
         <button className='bg-warning ps-1 pe-1 text-white rounded border-0' onClick={()=>{list.addescription=='Sale'?navigate('/ad/sale-homes/'+list.propertyid):navigate('/ad/rental-homes/'+list.propertyid)}}> full info</button>
                </div>
       
        <div className='d-flex justify-content-between'>
         <div className='d-flex align-items-center'><GoLocation/><span className='fs-6 ms-1'>address:{list.location}</span></div>
         <div className='d-flex align-items-center'><BsCalendarDate/><span className='fs-6 ms-1'>{list.postdate}</span></div>
          </div>
          <div className='d-flex justify-content-end pb-0'>
          <button style={{color:'darkblue'}} className="border-0 bg-white rounded">checkout  <AiOutlineArrowRight/> </button>
          </div>
          </div>
      
        </div>
      </div>
        )})) 
        
        :<Box sx={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
        <img style={{width:'250px',height:'250px'}} src = {Img} alt ='...'/>
        <Typography variant = "h5" sx={{textAlign:'right',fontFamily:'bold',}}>No properties in cart</Typography>
      </Box>} 
 </div>
</div>
  )
}

export default Cart