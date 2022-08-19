import React, { useState,useEffect } from 'react'
import styled from 'styled-components';
import {useDispatch,useSelector} from 'react-redux'
import Property from '../comp/Property';
import {Box,Grid,Stack,Typography,IconButton,Divider} from '@mui/material'
import Img from '../assets/images/noDataFound.png'
import PropertyList from '../comp/PropertyList';
import { getSavedPost } from '../features/SavedPosts/SavedpostSlice';
import {BsFillGridFill,BsList} from 'react-icons/bs'

const Span = styled.span`
  &:hover{text-decoration:underline;}
`
const SavedPosts = () => {
  const [ListView,setListView]=useState('Grid');
  const posts = useSelector(state=>state.savedposts)
  const user = useSelector(state=>state.user.user)
  const [category,setCategory] = useState("Sale");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(12);
  const dispatch = useDispatch();
  const indexOflastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOflastItem - itemPerPage;
  console.log(posts.data.length)
  const currentItems = posts.data.length >itemPerPage*currentPage?posts.data.slice(indexOfFirstItem, indexOflastItem):posts.data;
 
useEffect(()=>{
  dispatch(getSavedPost(user.userid))
},[])  

{return posts.data!=null?(

    <div style={{padding:'40px'}} className='w-100 bg-white rounded shadow'  >
      <div className='title p-1 fs-4 fw-bold d-flex justify-content-end align-items-center'>
        <div><Span onClick={()=>setCategory('Rental')} className='fs-4 text-info'>Rental</Span>{" "}/{" "}<Span onClick={()=>setCategory('Sale')}className='fs-4 text-warning'>Sale</Span></div>
        </div>
        <Stack
  direction="row"
  justifyContent="space-between"
  alignItems="center">
    <Typography variant="h5" color="black" sx={{fontFamily:'bold'}}>Saved Posts</Typography>
    <Box  sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:'flex-start',
          minWidth:100,     
          color: 'text.secondary'}}>      
 <IconButton size="medium" color="primary" aria-label="list View" onClick={()=>setListView('list')}><BsList/></IconButton>
<IconButton size="medium" color="primary" aria-label="grid view" onClick={()=>setListView('Grid')}><BsFillGridFill/></IconButton>

          </Box>
  </Stack>
  <Divider/>
        <Grid container  spacing={3} >
     {
    currentItems!=0?(  
     currentItems.map((prop, index) => {
      if(prop.addescription==category){
           return (   
            ListView=='Grid'?(               
             <Grid item xs={12} sm={6} lg={3} key={index}> 
                <Box key={index} sx={{width:{xs:350,sm:'auto'}}}>  
             <Property  p={prop}  /> 
               </Box>
             </Grid>):
             (
              <Grid item  xs={12} key={index}>
                <Box key={index}  sx={{width:{lg:'700px'}}}>
                <PropertyList p={prop} />
                </Box>
                </Grid>    ));
      }
              })
    ):
    (<Stack sx={{width:'100%'}} direction='column' justifyContent='center' alignItems="center">
      <img className='w-25 h-75' src={Img}  alt="..."/>
      <Typography variant="h6" sx={{fontFamily:'bold'}}>No data found</Typography>
    </Stack>)
      
       }
      
     </Grid>
    </div>
  ):(<div>loading...</div>)
}}

export default SavedPosts