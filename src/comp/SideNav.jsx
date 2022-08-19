import React from 'react'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar'
import {Link,useNavigate} from 'react-router-dom'
import { Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useSelector,useDispatch} from 'react-redux'
import { logout } from '../features/User/userSlice';
import { reset } from '../features/SavedPosts/SavedpostSlice';

const sections = [
  {
      url: "profile",
      name: "My Profile",
      icon: "far fa-user",
  },

  {
      url: "mylisting",
      name: "My Listing",
      icon: "far fa-list-alt",

  },

  {
      url: "add-listing",
      name: " Add Listing",
      icon: "fas fa-layer-group",

  },
  {
      url: "favourites",
      name: "saved Posts ",
      icon: "fas fa-layer-group",

  },
  {
    url: "cart",
    name: "My cart",
    icon: "fas fa-layer-group",

},
]; 
const SideNav= ({anchor,handledrawer}) => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }  
   handledrawer();
  };
  
  const { user} = useSelector((state)=>state.user);
  return (
 
    <Drawer 
    anchor={'right'}
    open={anchor}
    onClose={toggleDrawer('right', false)}
  >
  <Box 
      sx={{ width : 250,display:'flex',flexDirection:'column',alignItems:'center',pt:3}}
      role="presentation" 
    >
        <Avatar sx={{fontSize:'30px', width:'80px',height:'80px',bgcolor: deepOrange[500] }}>{user?.name.substr(0,1)}</Avatar>
        <Typography variant="h6" sx={{fontFamily:'bold'}}>{user?.name}</Typography>
        <Typography variant="subtitle1" sx={{fontWeight:'bold'}}>{user?.email}</Typography>
      <ul style={{listStyle: 'none' }}>
        {sections.map((data, index) => {
           return (
          <li key={index} className="position-relative pt-3  text-decoration-none">
            <Link style={{ padding: '16px 0px', textDecoration: 'none' }} className=" fw-bold  text-dark" to={`user/${data.url}`}>
               <p>{data.name}</p>
                 </Link>

                 </li>          ) })}
                 {user?.descp =='admin'&& 
                 <>
                                 <li className="position-relative pt-3 text-decoration-none">
                                 <Link style={{ padding: '16px 0px', textDecoration: 'none' }} className="fw-bold  text-dark" to={`user/admin-listing`}>
                                     <p>admin listing</p>                        
                                 </Link>
                             </li>
                              <li className="position-relative pt-3 text-decoration-none">
                              <Link style={{ padding: '16px 0px', textDecoration: 'none' }} className=" fw-bold  text-dark" to={`/admin`}>
                                  <p>contacts</p>                        
                              </Link>
                          </li>
                          </>
                             }
                             <li  className="position-relative pt-3 fw-bold text-dark text-decoration-none">
                             <p onClick={()=>{dispatch(logout());dispatch(reset());handledrawer();navigate('/')}}>Log Out</p>
                             </li>
                 </ul>
      <Divider />
      
    </Box>
  </Drawer>
  )
}

export default SideNav