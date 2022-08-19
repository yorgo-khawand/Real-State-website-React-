import React ,{useState,useEffect,useRef}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {FiArrowDown,FiArrowUp} from 'react-icons/fi'
import axios from 'axios';
import {Box,Collapse,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,Chip,Menu,Stack,Button,MenuItem,Dialog,TextField,DialogTitle,DialogContentText,DialogContent,DialogActions} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { BsThreeDots } from 'react-icons/bs'
import emailjs from "@emailjs/browser";
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

const Row = (props)=>{
const {prop,setDisplayReject} = props;
const [anchorEl, setAnchorEl] = React.useState(null);
const [open,setOpen] = React.useState(false);
const openMenu = Boolean(anchorEl);
const handleClose = () => {
  setAnchorEl(null);
};
return(
  <>   
 <TableRow  sx={{ '& > *': { borderBottom: 'unset' } }}>
 <TableCell>
   <IconButton
     aria-label="expand row"
     size="small"
     onClick={() => setOpen(!open)}
   >
     {open ? <FiArrowUp /> : <FiArrowDown/>}
   </IconButton>
 </TableCell>


 <TableCell align="left"><span className='fs-6'>{prop.adtitle}</span></TableCell>
 <TableCell align="left"><span className='fs-6'>{prop.propertydescp}</span></TableCell>
 <TableCell align="left"><span className='fs-6'>{prop.addescription}</span></TableCell>
 <TableCell align="left"><span className='fs-6'>{prop.location}</span></TableCell>
 <TableCell align="left"><span className='fs-6'>{prop.city}</span></TableCell>
 <TableCell align="left"><span className='fs-6'> <Chip label={prop.statusdescp} color="primary" variant="outlined" /></span></TableCell>
 <TableCell >


 <div>
                        <Button className='rounded-circle'                      
                          id="demo-customized-button"
                          aria-controls={openMenu ? 'demo-customized-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={openMenu ? 'true' : undefined}                      
                          disableElevation
                          onClick={(e)=>{setAnchorEl(e.currentTarget)}}
                       
                        >
                         <BsThreeDots style={{width:'25px',height:'25px'}}/>
                        </Button>
                        <StyledMenu key={prop.propertyid}
                          id="demo-customized-menu"
                          MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                          }}
                          anchorEl={anchorEl}
                          open={openMenu}
                          onClose={handleClose}
                        >                        
                        <MenuItem  disableRipple onClick={()=>{props.updatestatus(prop.propertyid)}}>
                            <span className='fs-6'>Accept</span>
                          </MenuItem>                                             
                          <MenuItem disableRipple onClick={()=>{setDisplayReject();props.rejectedProperty(prop.propertyid)}}>
                            <span className='fs-6'>reject</span>                           
                          </MenuItem>
                        </StyledMenu>
                      </div>
 </TableCell>
</TableRow>
   <TableRow >
   <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
     <Collapse in={open} timeout="auto"  unmountOnExit>
       <Box sx={{ margin: 1 }}>
         <Typography variant="h6" gutterBottom component="div">
         <span className='fs-6 text-primary'>  More about property</span>
         </Typography>
         
         <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
         <Typography variant="h6" sx={{fontFamily:'bold',color:'InfoText'}}>
         About user:
         </Typography>
          <Typography variant="subtitle1">user:{prop.name}</Typography>
          <Typography variant="subtitle1">email:{prop.email}</Typography>
          <Typography variant="subtitle1">phoneNumber:{prop.phoneNumber}</Typography>
         </Stack>
         <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
         <Typography variant="h6" sx={{fontFamily:'bold',color:'InfoText'}}>
         property details:
         </Typography>
          <Typography variant="subtitle1">bedrooms:{prop.bedrooms}</Typography>
          <Typography variant="subtitle1">bathrooms:{prop.bathrooms}</Typography>
          <Typography variant="subtitle1">floor:{prop.floors}</Typography>
          <Typography variant="subtitle1">furnished:{prop.furnished}</Typography>
          <Typography variant="subtitle1">size:{prop.size}</Typography>
          <Typography variant="subtitle1">payment Method:{prop.paymentdescp}</Typography>
          <Typography variant="subtitle1">furnished:{prop.furnished}</Typography>
          <Typography variant="subtitle1">city:{prop.city}</Typography>
          <Typography variant="subtitle1">price:{prop.price}</Typography>
         </Stack>
         <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
         <Typography variant="h6" sx={{fontFamily:'bold',color:'InfoText'}}>
         property desctiption:
         </Typography>
         <Typography variant="subtitle1">{prop.description}</Typography>
         </Stack>
         <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
{prop.images.map((image,index)=>{
 return(
  <img style={{width:'100px',height:'100px'}} src={image} alt="property imges"/>
 )
})}
        </Stack>
         
       </Box>
     </Collapse>
   </TableCell>
 </TableRow>
</>)

}

const AdminListing = () => {
  const {user} = useSelector(state=>state.user);
  const [displayReject,setDisplayReject] = useState(false)
  const [rejectedProperty,setRejectedProperty] = useState();
  const [adminListing,setadminListing]=useState(null);
  const updateStatus = (id)=>{
 axios.put(`http://localhost:80/realestate/admin-listing.php/${id}`).then(response=>
    adminListing.map((post)=>{if(post.propertyid == id){post.statusdescp='accepted'}})
    ).catch(error=>console.log(error));
  }
  useEffect(() => {
    axios({url:'http://localhost/realestate/admin-listing.php'}).then(response=>setadminListing(response.data)).catch(error=>console.log(error));
  },[]);
     const rejected= (id)=>{
      const formData = new FormData();
      formData.append('propid',id);
      axios({
        url:'http://localhost/realestate/admin-listing.php',
        method:"POST",
        data:formData,}).then(response=>
       adminListing.map((post)=>{if(post.propertyid == id){post.statusdescp='rejected'}})
          )
      
      }
     
        const handleClose = () => {
          setDisplayReject(false);
        };
        const form = useRef();
        const sendEmail = (e) => {
          e.preventDefault();
      
          emailjs.sendForm('service_dflq7lf', 'template_7h01mu9',form.current, 'JmecosFGIMEoVmuAc')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset()
      }
  return (
    <div style={{padding:'20px'}} className='w-100 bg-white rounded shadow'>
    <div style={{fontFamily:'bold'}}className='title p-1 fs-4 '>Admin  Listing:</div>
    <div className="p-3">
    <Dialog open={displayReject} onClose={handleClose}>
        <DialogTitle sx={{fontWeight:'bold',color:'darkblue'}}>Reject listing</DialogTitle>
        <DialogContent >
          <DialogContentText sx={{color:'black',fontSize:'15px',fontWeight:'normal'}}>
            Are you sure you want to delete this post?this will remove all data relating to this property,please enter your reject reason
          </DialogContentText>
          <form ref={form} onSubmit={sendEmail}>
          <TextField sx={{mt:1}}
            autoFocus
            // margin="dense"
            id="name"
            name="admin_name"
            label="admin name"
            disabled = {true}
            value={user.name}
            type="text"
            InputLabelProps={{
              style: { color: 'darkblue' },
            }}
            variant="standard"
          />
          <TextField sx={{mt:1}}
            autoFocus
            margin="dense"
            id="name"
            name = "rejected_reason"
            label="Reject reason"
            type="text"
            fullWidth
            InputLabelProps={{
              style: { color: 'darkblue' },
            }}
            variant="standard"
          />
          </form>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:'darkblue'}} onClick={handleClose}>Cancel</Button>
          <Button sx={{color:'darkblue'}} onClick={()=>{rejected(rejectedProperty);handleClose();}}>reject</Button>
        </DialogActions>
      </Dialog>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className='bg-primary'>
            <TableCell />
  
            <TableCell className="text-white fs-6" align="left"><span className='fs-6' >title</span></TableCell>
            <TableCell className="text-white" align="left"><span className='fs-6'>property type</span></TableCell>
            <TableCell className="text-white" align="left"><span className='fs-6'>ad type</span></TableCell>
            <TableCell className="text-white" align="left"><span className='fs-6'>location</span></TableCell>
            <TableCell className="text-white" align="left"><span className='fs-6'>city</span></TableCell>
            <TableCell className="text-white" align="left"><span className='fs-6'>status</span></TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {adminListing!=null && adminListing.map((list,index)=>{       
        return <Row key = {index} prop = {list} updatestatus = {(id)=>updateStatus(id)} setDisplayReject = {()=>setDisplayReject(true)} rejectedProperty={(id)=>setRejectedProperty(id)}  />
             
      })

          }
        </TableBody>
      </Table>
    </TableContainer>
 </div>
</div>
  )
}

export default AdminListing