import React,{useState,useRef} from 'react'
import { Paper, Stack, Typography ,Box,Button,Avatar, Divider} from '@mui/material'
import DatePicker from "react-horizontal-datepicker";
import { green } from '@mui/material/colors';
import emailjs from "@emailjs/browser";


const Schedule = ({name,email,phoneNumber}) => {
    const [selectedDay,setSelectedDay]=useState();
    const handledate =(val)=>{
   const newvalue = val.toString();

      setSelectedDay(newvalue.substr(0,15))
    }
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
    <Stack
  direction="column"
  justifyContent="flex-start"
  alignItems="flex-start"
  spacing={2}
  
>
    <Paper sx={{width:'100%',padding:1}} elevation={4} >
<Typography sx={{textAlign:'center',fontFamily:'bold',color:'darkblue'}} variant="h5" >Request a tour</Typography>
<Typography sx={{mt:1,color:'black',color:'darkblue',fontFamily:"bold"}} variant="subtitle1">Let the seller know when you're available, and the seller will contact you to arrange a tour.</Typography>
<Typography variant='h6' sx={{color:'darkblue' ,fontFamily:'bold'}}>seller description:</Typography>    
      <Stack className='rounded' sx={{px:1,backgroundColor:'#1870d5'}} spacing={1} direction="row" alignItems='center'>
      <Avatar   sx={{ width:'40px',height:'40px',bgcolor: green[500] }}>{name.substr(0,1)}</Avatar>
      <Box sx={{ width:'1000px',height:'60px'}}>
<Typography color="white" variant="subtitle1">{name}</Typography>
<Typography color="white" variant="subtitle1">{email}</Typography>

      </Box>

      </Stack>
<Typography variant="h6" sx={{fontWeight:'bold',mt:1}}>Select a date you’re available</Typography>
<DatePicker  getSelectedDay={(val)=>handledate(val)}
                  endDate={30}
                //   selectDate={new Date("2020-04-30")}
                  labelFormat={"MMMM yyyy"}
                  color={"#4783f3"} 
                           
/>
<Box sx={{padding:'10px'}}>
<form ref={form} onSubmit={sendEmail}>
<input style={{outline:'none',resize:"none",cursor:'pointer'}}type='text' name="user_date" id='date' value={selectedDay} className = 'w-100 p-2 rounded bg-white border mt-2' placeholder='selected date' />
    <label className='fw-bold mt-1' htmlfor="name">Your First and Last Name</label>
      <input style={{outline:'none',resize:"none",cursor:'pointer'}}type='text' name="user_name" id='name' className = 'w-100 p-2 rounded bg-white border mt-2' placeholder='name'/>
      <label className='fw-bold mt-1' htmlfor="name">Phone</label>
      <input style={{outline:'none',resize:"none",cursor:'pointer'}}type='number' name="user_phone" id='phone'  className = 'w-100 p-2 rounded bg-white border mt-2' placeholder='phone number'/>
      <label className='fw-bold mt-1 mb-0' htmlfor="name">Email</label>
      <input style={{outline:'none',resize:"none",cursor:'pointer'}}type='email' name="user_email" id='email' className = 'w-100 p-2 rounded bg-white border mt-2' placeholder='email'/>
     
      <Button fullWidth sx={{mt:1}} type="submit"  variant="contained" color="primary">Send request tour</Button>
      </form>
      </Box>
    
</Paper>
</Stack>
  )
}

export default Schedule
