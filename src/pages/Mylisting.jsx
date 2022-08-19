import React ,{useEffect,useState}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Bg from '../assets/images/pfebg3.jpg'
import {useNavigate} from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import Button from '@mui/material/Button';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import { SelectedListing,DeleteUserListing,getUserListing} from '../features/User/userSlice';
import {
  Table, TableCell, TableRow, TableBody, TableContainer, TableHead, Paper
} from '@material-ui/core'
import Chip from '@mui/material/Chip';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
const Mylisting = () => {
  let listings=[];
   listings = useSelector(state=>state.user.myListings.data);
  const user = useSelector(state=>state.user.user)
console.log(listings)

  const [anchorEl, setAnchorEl] = React.useState(null);
 const [selectedProp,setSelectedProp] = useState(null);
 const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserListing(user.userid))
  },[]);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <div style={{padding:'20px',minHeight:'calc(100vh - 70px)'}} className='w-100  rounded shadow'>
         <div  style={{fontFamily:'bold'}} className='title p-1 fs-5 '>My Listing</div>
         <div className="p-3">
        <TableContainer className="border rounded">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className = "bg-primary ">
                <TableCell><span className='fs-6 text-white'>Image</span></TableCell>
                <TableCell align="left" ><span className='fs-6 text-white'>title </span></TableCell>
                <TableCell align="left"><span className='fs-6 text-white'>location</span></TableCell>
                <TableCell align="left"> <span className='fs-6 text-white'>price</span></TableCell>
                <TableCell align="left"><span className='fs-6 text-white'>rooms&nbsp;|baths&nbsp;|floor</span></TableCell>
                <TableCell align="left"><span className='fs-6 text-white'>status</span></TableCell>
            <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
            
              {listings!=0?listings.map(({propertyid,adtitle,price,bedrooms,floors,statusdescp,bathrooms,description,size,postdate,location,city,images})=> {

                return  (
                  <TableRow
                    key={propertyid}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img style={{ width: '100px', height: '100px' }} src={images[0]} alt="img..." />
                    </TableCell>
                    <TableCell align="left"><span className='fs-6'>{adtitle}</span></TableCell>
                    <TableCell align="left"><span className='fs-6'>{location}</span></TableCell>
                    <TableCell align="left"><span className='fs-6'>{price}</span></TableCell>
                    <TableCell align="left"><span className='fs-6'>{bedrooms}&nbsp;|{bathrooms}&nbsp;|{floors}</span></TableCell>
                    <TableCell align="left"><span className='fs-6 rounded-circle p-2 '><Chip label={statusdescp} color={statusdescp=='accepted'?'success':'primary'} variant="outlined" /></span></TableCell>
                    <TableCell align="left">

                      <div>
                        <Button className='rounded-circle'                      
                          id="demo-customized-button"
                          aria-controls={open ? 'demo-customized-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}                      
                          disableElevation
                          key={propertyid}
                          onClick={(e)=>{setAnchorEl(e.currentTarget);setSelectedProp(propertyid)}}
                       
                        >
                         <BsThreeDots style={{width:'25px',height:'25px'}}/>
                        </Button>
                        <StyledMenu 
                          id="demo-customized-menu"
                          MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >                        
                        <MenuItem onClick={()=>{ dispatch(SelectedListing({selectedProp:selectedProp}));navigate(`modify/${selectedProp}`)}} disableRipple>
                            <span className='fs-6'>modify</span>
                          </MenuItem>                                             
                          <MenuItem onClick={()=>{dispatch(DeleteUserListing(selectedProp))}} disableRipple>
                            <span className='fs-6'>delete</span>                           
                          </MenuItem>
                        </StyledMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              }):
              (<div>loading...</div>)}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        </div>
  )
 

}

    

export default Mylisting