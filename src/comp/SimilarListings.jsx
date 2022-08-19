import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import { FaBath, FaBed } from 'react-icons/fa';
import{BsGridFill,BsCalendarDate} from 'react-icons/bs'
import{GoLocation} from 'react-icons/go'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {AiOutlineCamera} from 'react-icons/ai'
import { Stack,Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom'

const StyledSlider = styled(Slider)`
  .slick-slide{
    margin-left:  15px !important;
    margin-right:  15px !important;
  }
 .slick-track {
  display: flex !important;
 
}

.slick-slide {
  height: auto;
}
`;
const SimilarListings = (props) => {
  const [similar,setSimilar] = useState();
  useEffect(() =>{
    const form=new FormData();
    form.append('location',props.location);
    const params = new URLSearchParams(form);
    axios.get(`http://localhost/realestate/buysell.php?${params}`).then(response=>setSimilar(response.data))
  },[props.location])
const similarlisting =similar!=null ? similar.filter(list =>list.propertyid !==props.currentProperty):[];
 console.log(similarlisting)
var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,      
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
 const navigate = useNavigate();
  return (
      <div className='w-100 h-100'>
  {similarlisting!=0 ? 
     <div style={{height:'400px'}} className='w-100'>
<StyledSlider {...settings}>
{similar.map(({propertyid,furnished,addescription,propertydescp,adtitle,price,bedrooms,bathrooms,description,size,postdate,location,city,images})=>{
 if(propertyid!=props.currentProperty){
 return (

  <div  style={{height:'350px'}}   className='shadow  bg-body rounded   pt-0 d-flex flex-column justify-content-start   overflow-hidden'>         
  <div style={{height:'175px'}} className='w-100  p-0 m-0 position-relative'>
  <div style={{position:'absolute',top:'5px',color:'white',width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
  <div className='d-flex '>
  <span style={{backgroundColor:'#f6d3a1'}}className="badge text-dark rounded-0  ps-1 pe-1 bg-warning">{propertydescp}</span>
  {furnished == 'yes'?<span  style={{backgroundColor:'#f6d3a1'}} className='badge rounded-0 ms-1 ps-1 pe-1 bg-warning text-dark'>furnished</span>:''}
  </div>
  </div>
  <div style={{position:'absolute',bottom:'0px',color:'white',width:'100%',display:'flex',justifyContent:'space-between'}}>
  <span  ><GoLocation/>{location},{city}</span>
  <span className=' fs-6 text-white'>7<AiOutlineCamera/> </span>
  </div> 
  <img style={{width:'100%',height:'175px'}} src={images[0]}  alt = '....'/>
  </div>

      <div className = 'w-100 m-0 p-1 d-flex  justify-content-between'>
          <text className='fs-5 fw-bold'>{adtitle}</text>
          <text className='fs-7 fw-bold text-warning'>{price}${props.type=='for-rent'?'/month':''}</text>
      </div>
      <span className='p-1'>{description.substr(0,50)}...</span>
      <div className="d-flex w-100 align-items-center ps-1 pe-1 justify-content-between text-black-50">
      <span>{bedrooms} <FaBed/>&nbsp;{bathrooms} <FaBath/> &nbsp;{size}m2 <BsGridFill/></span>
      </div>
      <div className='w-100 d-flex ps-1 pe-1  align-items-center justify-content-between'> 
     <span><BsCalendarDate className='me-1'/>{postdate}</span>
     <button className="border-0 bg-white rounded text-warning" onClick={()=>{addescription=='Rental'?navigate(`/ad/rental-homes/${propertyid}`):navigate(`/ad/sale-homes/${propertyid}`)}}>view more <AiOutlineArrowRight/> </button>
</div> 
</div>
 )
 }
}
  )
}
</StyledSlider>
</div>
:(
  <Stack sx={{width:'100%',mt:2,mb:2}} direction='column' justifyContent='center' alignItems="center">
    <Typography variant="h5" sx={{fontFamily:'bold'}}>No similar listing</Typography>
  </Stack>)}
</div>
  ) 
}

export default SimilarListings