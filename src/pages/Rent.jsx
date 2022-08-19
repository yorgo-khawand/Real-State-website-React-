import React, { useState, useEffect } from 'react'
import Property from '../comp/Property';
import { useSearchParams } from 'react-router-dom';
import Filter from '../comp/Filter';
import FilterModal from './FilterModal';
import Footer from '../comp/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRentalProperties } from '../features/properties/propertySlice';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {  Container, Typography ,IconButton,Chip} from '@mui/material';
import { Stack } from '@mui/material';
import {BsFillGridFill,BsList} from 'react-icons/bs'
import Img from '../assets/images/noDataFound.png'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import PropertyList from '../comp/PropertyList';
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
const Rent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(12);
  const [ModalStatus, setModalStatus] = useState(false);
  const [sorting,setSorting] = useState('default');
  const [ListView,setListView]=useState('Grid');
  const [SearchParams]=useSearchParams();
 
  const dispatch = useDispatch();
  useEffect(() => { 
  const form=new FormData();
SearchParams.forEach(function(value, key) {
  form.append(key,value);
});
dispatch(fetchRentalProperties(form))

}, [SearchParams]);
const params=[];
SearchParams.forEach(function(value, key) {
  params.push(<Chip label={`${key}: ${value}`}  variant="contained" />)
});
const property = useSelector((state)=>state.property.data);
// console.log(property);
const indexOflastItem = currentPage * itemPerPage;
const indexOfFirstItem = indexOflastItem - itemPerPage;
const currentItems = property.length >=itemPerPage*currentPage?property.slice(indexOfFirstItem, indexOflastItem):property;
// console.log(currentItems)

  return (
    <>
      {property.loading == 'pending' || property.loading == 'rejected' ? <div style={{ height: "100vh" }}>loading...</div> : (
        <div className='d-flex  flex-column align-items-center bg-white' >
          <Filter  
          show={() => setModalStatus(true)} />
        
            {ModalStatus && <FilterModal hide={() => setModalStatus(false)}  type="rent"  />}
            <Container fixed sx={{minHeight:'60vh'}}>   
   <Stack
  direction="row"
  justifyContent="space-between"
  alignItems="center">
    <Typography variant="h5" color="black" sx={{fontFamily:'bold'}}>Search Properties for rent</Typography>
    <Box  sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:'flex-start',
          minWidth:200,     
          color: 'text.secondary'}}>
     <FormControl variant="standard" autoWidth>
        <InputLabel id="demo-simple-select-standard-label" > <span className='text-dark  fw-bold'>Sort by:</span></InputLabel>
        <Select disableUnderline
          labelId="demo-simple-select-standard-label"
          
          value={sorting}
          onChange={e=>{setSorting(e.value)}}
          label="sort b"
          inputProps={{
            name:'sorting'
                       
          }}
          MenuProps={MenuProps}
        >
          {['default','price','size','bedrooms','bathrooms'].map((name) => (
            <MenuItem
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>       
 <IconButton size="medium" color="primary" aria-label="list View" onClick={()=>setListView('list')}><BsList/></IconButton>
<IconButton size="medium" color="primary" aria-label="grid view" onClick={()=>setListView('Grid')}><BsFillGridFill/></IconButton>

          </Box>
  </Stack>
  <Divider/>
  
  <Typography variant="subtitle1" color="black" sx={{fontWeight:'900',color:'darkblue'}}>{currentItems.length } ad found matching   </Typography>
  <Stack direction='row' spacing={1} alignItems="center" sx={{mt:1,mb:1}}>
  {params}
  </Stack>
     <Grid container  spacing={3} >
     {
    currentItems!=0?(
      currentItems.map((prop, index) => {
      
        return (   
         ListView=='Grid'?(               
          <Grid item xs={12} sm={6} lg={4} key={index}> 
             <Box key={index} sx={{width:{xs:350,sm:'auto'}}}>  
          <Property  p={prop} /> 
            </Box>
          </Grid>):
          (
           <Grid item  xs={12} key={index}>
             <Box key={index} sx={{height:'160px'}}>
             <PropertyList p={prop} key={prop.propertyid}  />
             </Box>
             </Grid>    ))})
         ):
         (<Stack sx={{width:'100%',height:'50vh'}} direction='column' justifyContent='center' alignItems="center">
           <img className='w-25 h-75' src={Img}  alt="..."/>
           <Typography variant="h6" sx={{fontFamily:'bold'}}>No data found</Typography>
         </Stack>)
           
            }
     </Grid>
     </Container>
     <Pagination sx={{margin:'5px'}} count={(property.length/itemPerPage)+1} color="primary"  shape="rounded" onChange={(event,value)=>{setCurrentPage(value)}}     />
        </div>
      )}
      <Footer />
   
    </>
  )
}

export default Rent