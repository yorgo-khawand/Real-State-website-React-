import React from 'react'
import { useSelector,useDispatch} from 'react-redux';
import{BsHeart,BsFillHeartFill,BsGridFill,BsCalendarDate} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { FaBath, FaBed } from 'react-icons/fa';
import{GoLocation} from 'react-icons/go'
import {AiOutlineCamera} from 'react-icons/ai'
import { openModal } from '../features/Modal/ModalSlice';
import { UpdateSavedPost,RemoveSavedPost } from '../features/SavedPosts/SavedpostSlice';


const PropertyList = (props) => {
 
  const detail = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const {propertyid,adtitle,price,bedrooms,bathrooms,size,postdate,location,rentingdate,description,images,addescription} = props.p;
  const savedPosts = useSelector((state)=> state.savedposts.data);
  const favoritepost =savedPosts.length!=0?savedPosts.filter((post)=>{ return post.propertyid ==propertyid}):[];
  const navigate=useNavigate();
  const update=(userid,propertyid)=>{
    const form = new FormData();
    form.append('userid',userid);
    form.append('propertyid',propertyid);
    console.log(propertyid);
    dispatch(UpdateSavedPost(form));
  }
  return (
    <div className="card shadow-sm border-0 mb-3 h-100 "  >
    <div className="row g-0 h-100">
      <div  className=" position-relative w-25 h-100 ">
        <img src={images[0]} className="w-100 h-100 rounded-start" alt="..."/>
        <span className='position-absolute fs-6 text-white bottom-0 end-0 me-1'>7<AiOutlineCamera/> </span>
        <span style={{position:'absolute',top:'5px',left:'0px'}} className="badge rounded-0 p-1 bg-warning text-dark">{props.p.propertydescp}</span>
      </div>
      <div className="w-75">
        <div className=" p-1 ">
          <div className='d-flex justify-content-between align-items-center'>
          <h5 className="card-title">{adtitle}</h5>
          {favoritepost.length!=0 ? <BsFillHeartFill size={'25px'} color={'red'}  onClick = {()=>dispatch(RemoveSavedPost(favoritepost[0].favoriteid))} />:<BsHeart size={'25px'} color={'black'}  onClick={()=>{detail.isSuccess==false?dispatch(openModal()):update(detail.user.userid,propertyid)}} />}
         </div>
         <span className="d-block text-warning">{price}${addescription=="Rental"?`/${rentingdate}`:''}</span>
         <span  className="d-block  fs-6" >{description.substr(0,150)}</span>
         <div className="d-flex w-100 align-items-center p-1 justify-content-between ">
         <span className='text-black-50 '> {bedrooms}  <FaBed/> &nbsp; {bathrooms}<FaBath/>&nbsp; {size} <BsGridFill/></span>
         <button className='bg-warning ps-1 pe-1 text-white rounded border-0' onClick={()=>{addescription=='Sale'?navigate('/ad/sale-homes/'+propertyid):navigate('/ad/rental-homes/'+propertyid)}}> full info</button>
                </div>
       
<div className='d-flex justify-content-between'>
         <div className='d-flex align-items-center'><GoLocation/><span className='fs-6 ms-1'>address:{location}</span></div>
         <div className='d-flex align-items-center'><BsCalendarDate/><span className='fs-6 ms-1'>{postdate}</span></div>
          </div>
          </div>
          
        </div>
        </div>
      </div>
    
  )
}

export default PropertyList