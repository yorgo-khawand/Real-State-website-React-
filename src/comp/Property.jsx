import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { FaBath, FaBed } from 'react-icons/fa';
import{BsGridFill,BsHeart,BsFillHeartFill,BsCalendarDate} from 'react-icons/bs'
import{GoLocation} from 'react-icons/go'
import { openModal } from '../features/Modal/ModalSlice';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
 import { UpdateSavedPost,RemoveSavedPost } from '../features/SavedPosts/SavedpostSlice';
import {AiOutlineCamera} from 'react-icons/ai'
const Text = styled.span``
const Circle= styled.span``
const Span= styled.span``

const Button = styled.div`
position: relative;
border:0;
display: inline-block;
width:8rem;
height:1.8rem;
cursor: pointer;
outline: none;
vertical-align: middle;
${Text}{
  position: absolute;
  inset:0;
  padding: 0.2rem 0;
  margin-left:1.85rem;
  color:black;
  line-height: 1.40;
  text-align: center;
  transition: all 0.4s ease-in-out;
}
${Circle}{
  position:relative;
  display: block;
  margin:0;
  width:1.8rem;
  height:1.8rem;
  background:#ffbe00;
  border-radius: 0.9rem;
  transition: all 0.4s ease-in-out;
}
${Span}{ 

&.icon{
position: absolute;
top:0;
bottom:0;
width: 0.125rem;
height: 0.125rem;
margin:auto;
background-color: white;
}

&.arrow{
  left:0.50rem;
  width:0.7rem;
  height: 0.125rem;
  background:none;
  transform: all 0.4s ease-in-out;
  &::before{
    content: "";
    position: absolute;
    top:-0.3rem;
    right:0.0625rem;
    width:0.625rem;
    height: 0.625rem;
    border-top:0.125rem solid white ;
    border-right: 0.125rem solid white;
    transform: rotate(45deg);

  }
}
}
&:hover ${Circle}{
  width: 100%;

  &:hover ${Span}{
  background: white;
  transform: translateX(0.5rem);
}
}
&:hover ${Text}{
  color:white;
}
`
const Property = (props) => {
  let iconstyle={
    width:'30px',
height:'30px',
  }
  const {propertyid,adtitle,price,bedrooms,bathrooms,description,size,postdate,location,rentingdate,addescription,city,images} = props.p;
  const savedPosts = useSelector((state)=> state.savedposts.data);
  
  const favoritepost =savedPosts.length!=0?savedPosts.filter((post)=>{ return post.propertyid ==propertyid}):[];
  const detail = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
   
  const update=(userid,propertyid)=>{
    const form = new FormData();
    form.append('userid',userid);
    form.append('propertyid',propertyid);
    console.log(propertyid);
    dispatch(UpdateSavedPost(form));
  }
 
  return (
    
        <div style={{height:'355px'}}  className='w-100  shadow  bg-body rounded   pt-0 d-flex flex-column justify-content-between flex-wrap  mt-5  overflow-hidden'>
            
            <div style={{height:'200px'}} className='w-100  p-0 m-0 position-relative'>
            <div style={{position:'absolute',top:'5px',color:'white',width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div className='d-flex '>
            <span style={{backgroundColor:'#f6d3a1'}}className="badge text-dark rounded-0  ps-1 pe-1 bg-warning">{props.p.propertydescp}</span>
            {props.p.furnished == 'yes'?<span  style={{backgroundColor:'#f6d3a1'}} className='badge rounded-0 ms-1 ps-1 pe-1 bg-warning text-dark'>furnished</span>:''}
            </div>
            {favoritepost.length!=0 ? <BsFillHeartFill size={'30px'} color={'red'} style ={iconstyle} onClick = {()=>dispatch(RemoveSavedPost(favoritepost[0].favoriteid))} />:<BsHeart size={'30px'} color={'white'} style ={iconstyle} onClick={()=>{detail.isSuccess==false?dispatch(openModal()):update(detail.user.userid,propertyid)}} />}
            </div>
            <div style={{position:'absolute',bottom:'0px',color:'white',width:'100%',display:'flex',justifyContent:'space-between'}}>
            <span  ><GoLocation/>{location},{city}</span>
            <span className=' fs-6 text-white'>7<AiOutlineCamera/> </span>
            </div>
            
            <img style={{width:'100%',height:'200px'}} src={images[0]}  alt = '....'/>
            </div>
            
                <div className = 'w-100 m-0 ps-1 d-flex  justify-content-between'>
                    <text className='fs-5 fw-bold'>{adtitle}</text>
                    <text className='fs-7 fw-bold text-warning'>{price}${addescription=="Rental"?`/${rentingdate}`:''}</text>
                </div>
                <span className='ps-1'>{description.substr(0,90)}...</span>
                <div className="d-flex w-100  ps-1 pe-1 justify-content-between text-black-50">
                <span>{bedrooms} <FaBed/>&nbsp;{bathrooms} <FaBath/> &nbsp;{size}m2 <BsGridFill/></span>
                </div>
                <div className='w-100 d-flex ps-1 pe-1 pb-1 align-items-center justify-content-between'> 
               <Button onClick={()=>navigate(`${props.p.propertyid}`)}>
                <Circle>
                 <Span className='icon arrow'></Span>
                  </Circle>
               <Text> view more</Text>
               </Button>
               <span><BsCalendarDate className='me-1'/>{postdate}</span>
          </div>
  
            
    </div>
   
  )
}

export default Property