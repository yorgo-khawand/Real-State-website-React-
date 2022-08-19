import React,{useEffect, useState} from 'react'

import { Link} from 'react-router-dom'
import {FaHouseDamage} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button,Avatar} from '@mui/material'
import Typography from '@mui/material/Typography';
import { deepOrange } from '@mui/material/colors'
import Container from '@mui/material/Container';

const NavbarPfe = ({open,opendrawer}) => {
  const {isSuccess,user} = useSelector((state)=>state.user);
  if(isSuccess){
  const letter = user.name.substr(0,1)}
  useEffect(() => {
       },[isSuccess]);
return (
  <AppBar position="static" >
      <Container  maxWidth="xl" >
        <Toolbar disableGutters> 
        <Box sx={{height:'40px',display:'flex',alignItems:'center'}}> 
        <Link to ='/' className='text-white text-decoration-none'>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
             
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          </Link>
          <FaHouseDamage/>
          </Box>
          <Box gap={2} sx={{mx:2,width:'auto',height:'40px', flexGrow: 1,color:'white', display:'flex',alignItems:'center' }} >
          <Link className='mt-0 text-white text-decoration-none d-block ms-1' to= 'ad/sale-homes' underline="none"><span>Buy</span></Link>
          <Link className='mt-0 text-white text-decoration-none d-block ms-1' to= 'ad/rental-homes' underline="none">Rent</Link>
          {isSuccess ? <Link className='mt-0 text-white d-block ms-1 text-decoration-none'  to ='/user/add-listing'>sell</Link> :< Typography sx={{ my: 2,mx:1, color: 'inherit',  fontWeight: 700, display: 'block' }} onClick={open}>sell</Typography>}
          </Box>
        

          <Box sx={{ flexGrow: 0 }}>
          {isSuccess ?<Button onClick={opendrawer}><Avatar  sx={{ width:'35px',height:'35px',bgcolor: deepOrange[500] }}>{user.name.substr(0,1)}</Avatar></Button>:< span className='text-white ' onClick={open}>sign in</span>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
)

}

export default NavbarPfe