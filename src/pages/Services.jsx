import React from 'react'
import { FaSearch, FaHandsHelping } from 'react-icons/fa'
import {CgNotes} from 'react-icons/cg'
import{GiShakingHands} from 'react-icons/gi'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const NoteIcon  = styled(CgNotes)`
background-color: yellow;
width : 50px;
height:50px;
color:white;
border-radius: 50%;
`
const DealIcon= styled(GiShakingHands)`
background-color: green;
width : 50px;
height:50px;
color:white;
border-radius: 50%;
`
const HandsIcon = styled(FaHandsHelping)`
background-color: orange;
width : 50px;
height:50px;
color:white;
border-radius: 50%;
`

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const Title  = styled.h2`
margin-top:'10px';
width:'100px';
text-align: center;
font-weight: bolder;
color:#1869ff;
letter-spacing:0.2px;
font-family: 'Regular 400 Italic';`

const data =[
  {
  title:'Evaluate property',
  content:`Evaluated is very important ${<br/>} your property buy and sell`,
  icon:'CgNotes',
  color:'yellow',
},
{
  title:'Meet the seller',
  content:`schedule a date to meet your seller ${<br/>}and see your dream house`,
  icon:'FaHandsHelping',
  color:'orange',
},
{
  title:'Close the deal',
  content:`make a deal with the seller ${<br/>}and move to your dream house`,
  icon:'GiShakingHands',
  color:'green',
},

]


const Services= () => {
  return (
    <Grid container sx={{mt:5,mx:4}} spacing={1}>
      {data.map((service)=>{
  <Grid item xs={4}>
 <Box  sx={{width:'80%',display:'flex',flexDirection:'column',alignItems:'center'}} >
{data[0].icon=='FaHandsHelping' &&<HandsIcon/> ||data[0].icon == 'GiShakingHands'&&<DealIcon/>||data[0].icon == 'CgNotes'&&<NoteIcon/>}
<Typography variant="h6">{data[0].title}</Typography>
<Typography variant="subtitle1">{data[0].content}</Typography>
</Box> 
</Grid>
      })}


   </Grid>

  )
}

export default Services