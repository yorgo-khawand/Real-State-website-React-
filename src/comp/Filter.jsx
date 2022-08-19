
import React,{useState} from 'react'
import{IoIosArrowDown} from 'react-icons/io'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {locations}from '../constants/constants';
import {AiOutlineSend} from 'react-icons/ai';
import {useSearchParams} from'react-router-dom'
import { Container,Paper,Grid,Box,Stack,Typography,Button,FormControl} from '@mui/material';

export const Filter = ({show}) => { 
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters,setFilters]=useState({
    location:'see ads in all lebanon',
    city:'see ads in all lebanon'
  })
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
   
   const handleParams=()=>{
  let tmp={}
  for (const entry of searchParams.entries()) {
    const [param, value] = entry;
    tmp[param]=value;
  }
  Object.keys(filters).map((filter)=>{
if(filters[filter]!=''){
tmp[filter]=filters[filter];
}
  })
  setSearchParams(tmp)
 
   }
  return (
<Container sx={{my:2,padding:2}} maxWidth="lg">
  <Paper elevation={1}>
  <Grid container  direction="row" 
  alignItems="center" >
<Grid item   sx={{padding:1}} xs={3}>
  <Box sx={{borderRight:'1px solid grey',paddingRight:1}}  >
 
         <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label"> <span className='text-primary'>Choose location</span></InputLabel>
        <Select fullWidth disableUnderline
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filters.location!=null?filters.location:''}
          onChange={ ({target:{name,value}}) =>{setFilters({...filters,[name]:value})}}
          label="choose location"
          inputProps={{
            name:'location',            
          }}
          MenuProps={MenuProps}
        >

  <MenuItem  value={'see ads in all lebanon'}>
             <em>see ads in all lebanon</em>
           </MenuItem>
          {locations.map((loc,index)=><MenuItem  value = {loc.location} key ={index}><span className='fs-6'>{loc.location}</span></MenuItem>)}
         </Select>
         </FormControl>
  </Box>
</Grid>
<Grid item xs={3}>
  <Box sx={{borderRight:'1px solid grey',paddingRight:1}}  >
  <FormControl variant="standard"  fullWidth>
        <InputLabel id="demo-simple-select-standard-label"> <span className='text-primary'>Choose city</span></InputLabel>
        <Select fullWidth disableUnderline
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filters.city}
          
          label="choose city"
          inputProps={{
            name:'city',          
            
          }}
          onChange={ ({target:{name,value}}) =>{setFilters({...filters,[name]:value})}}
          MenuProps={MenuProps}
        >
  
       
             <MenuItem  value="see ads in all lebanon">
             <em>see ads in all lebanon</em>
           </MenuItem>
          {locations.map((loc)=>
          loc.location ==filters.location&& loc.cities.map((city,ind)=><MenuItem  value = {city} key ={city}><span className='fs-6'>{city}</span></MenuItem>))}
         </Select>
         </FormControl>
  </Box>
</Grid>
<Grid item xs={3}>

  <Stack sx={{width:'100%',px:1}}
  direction="column"
  justifyContent="center"
  alignItems="center"
>
       <Typography variant="subtitle1"  color='black' sx={{fontWeight:'900',}} >more</Typography>
       <Stack
  direction="row"
  justifyContent="flex-start"
  alignItems="center">
          <Typography className="text-black"variant="h6" sx={{color:'gray',fontFamily:'bold',letterSpacing:'0.2px'}}>Advanced filter</Typography>
          <IoIosArrowDown onClick={show}/>
          </Stack>
          </Stack>
 
  </Grid>
  <Grid item xs={3}>
    <Box sx={{display:'flex',justifyContent:'flex-end',marginRight:'5px'}}>
  <Button  color="primary" variant="contained" endIcon={<AiOutlineSend/> }  onClick={handleParams}>
  Search
</Button>
</Box>
  </Grid>
  </Grid>
  </Paper>
</Container>)
    
}

export default Filter