import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GoLocation } from 'react-icons/go'
import PropertyGallery from '../comp/PropertyGallery'
import styled from 'styled-components'
import PropertyFeatures from '../comp/PropertyFeatures'
import PropertyDescriptions from '../comp/PropertyDescriptions'
import PropertyAddress from '../comp/PropertyAddress'
import { useSelector,useDispatch } from 'react-redux'
import Schedule from '../comp/Schedule'
import { Box, Typography,Paper,Stack,Snackbar,Alert} from '@mui/material'
import{BsHeart,BsFillHeartFill,BsCalendarDate} from 'react-icons/bs'
import SimilarListings from '../comp/SimilarListings'
import { openModal } from '../features/Modal/ModalSlice';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import axios from 'axios'
import { UpdateSavedPost,RemoveSavedPost } from '../features/SavedPosts/SavedpostSlice';
const Button = styled.button`
&.btn-hover{
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    margin: 20px 0px;
    height: 55px;
    text-align:center;
    border: none;
    background-size: 300% 100%;
    /* border-radius: 50px; */
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
    &:hover{
        background-position: 100% 0;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
    }
   
}
&.color1{
 
 background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
    }
`
const Left = styled.div`
width:65%;
@media screen and (max-width:700px) {
  width:100%;  
}
`
const Right = styled.div`
width:25%;
@media screen and (max-width:700px) {
  width:100%;  
}
`
const HeaderContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin:'32px 0px';
padding:'5px';
 @media screen and (max-width: 700px) {
            flex-direction:column;
             align-items:flex-start;    
       }
`
const BodyContainer = styled.div`
width:100%;
display: flex;
justify-content: space-evenly;
align-items: flex-start;
margin:'32px 0px';
 @media screen and (max-width: 700px) {
            flex-direction:column;   
       }`



const PropertyDetails = () => {
    const { propertyCode } = useParams();
    const dispatch = useDispatch()
    const [property,setproperty] = useState()
    const savedPosts = useSelector((state)=> state.savedposts.data);
    const detail = useSelector(state=>state.user)
  const favoritepost =savedPosts.length!=0?savedPosts.filter((post)=>{ return post.propertyid ==propertyCode}):[];
  const [open, setOpen] = React.useState(false);
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;}
    setOpen(false);
  };

  useEffect(()=>{
 axios.get(`http://localhost/realestate/buysell.php?propertyid=${propertyCode}`).then(response=>setproperty(response.data)).catch((error)=>console.log(error))},[propertyCode])
 console.log(property);
  const update=(userid,propertyid)=>{
    const form = new FormData();
    form.append('userid',userid);
    form.append('propertyid',propertyid);
    console.log(propertyid);
    dispatch(UpdateSavedPost(form));
  }
  const Addtocart=(userid,propertyid)=>{
    const form = new FormData();
    form.append('userid',userid);
    form.append('propertyid',propertyid);
    setOpen(true);
    axios({method:'POST',url:'http://localhost/realestate/cart.php',data:form}).then(response=>response.data).catch(error=>console.log(error));
  }
  return (
        <div  >
             <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:"top",horizontal: 'right' }}>
             <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Property added successfully!
        </Alert>
      </Snackbar>
    {property!=null &&property.map((prop)=>(
                <section className='bg-light' >
                    <HeaderContainer>
                        <div className='left p-2 ' >
                            <h2 style={{fontFamily:'bold'}}>{prop.adtitle}</h2>
                            <div  className='d-flex align-items-center'>
                                <GoLocation style={{ color: 'rgba(0, 0, 0, 0.16)' }} />
                                <span style={{fontFamily:'bold',fontSize:'20px'}}>{prop.location},{prop.city}</span>
                            </div>
                        </div>
                        <div className='right'>
                            <span className=' fw-bold fs-4 me-2'>{prop.price}$</span>
                        </div>
                    </HeaderContainer>
                    <BodyContainer>
                        <Left className='content_left '>
                            <PropertyGallery images={prop.images} />
                            <PropertyFeatures bedrooms={prop.bedrooms}
                                bathrooms={prop.bathrooms}
                                condition={'good'}
                                floor={prop.floors}
                                propertyType={prop.propertydescp}
                                furnished={prop.furnished}
                            />
                            <PropertyDescriptions desc={prop.description} />
                            <PropertyAddress city={prop.city}
                                location={prop.location}
                            />
                            <Typography variant = "h6" sx={{fontFamily:'bold'}}>Similar listings</Typography>
                            <SimilarListings location = {prop.location} currentProperty ={propertyCode} />
                        </Left>
                        <Right>
                          <Stack  direction="row" spacing={2} sx={{width:'100%',mb:1}} >
                           <Box sx={{width:'50%'}} > 
                            <Paper sx={{display:'flex',alignItems:'center',justifyContent:'space-around',px:1}}>                     
      <Typography sx={{fontFamily:'bold',color:'darkblue'}} variant ="h6">save ad</Typography>
      {favoritepost.length!=0 ? <BsFillHeartFill size={'20px'} color={'red'}  onClick = {()=>dispatch(RemoveSavedPost(favoritepost[0].favoriteid))} />:<BsHeart size={'20px'} color={'black'}  onClick={()=>{detail.isSuccess==false?dispatch(openModal()):update(detail.user.userid,propertyCode)}} />}
      </Paper>  
                           </Box>
                           <Box sx={{width:'50%'}} > 
                            <Paper sx={{px:1,display:'flex',alignItems:'center'}}>    
                            <BsCalendarDate/>                 
                           <Typography sx={{px:1,fontFamily:'bold',color:'darkblue'}} variant ="h6">{prop.postdate}</Typography>
      </Paper>  
                           </Box>
                           </Stack>
                       <Schedule name={prop.name} phoneNumber={prop.phoneNumber} email={prop.email}/>
                       <Button className='btn-hover color1' onClick={()=>{detail.isSuccess==false?dispatch(openModal()):Addtocart(detail.user.userid,propertyCode)}}>Add to cart <AiOutlineShoppingCart size="25px"/> </Button>
                        </Right>
                      
                    </BodyContainer>
                    

                </section>))}
        </div>

    )

  
}

export default PropertyDetails