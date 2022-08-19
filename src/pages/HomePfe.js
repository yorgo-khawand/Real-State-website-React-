import React from 'react'
import styled from 'styled-components'
import Bg from '../assets/images/pfebg7.jpg'
import Footer from '../comp/Footer'
import { useNavigate } from 'react-router-dom'
import Img from '../assets/images/pfeImg2.jpg'
import Img1 from '../assets/images/appartmentbg3.jpg'
import {IoSend} from'react-icons/io5'
import { locations } from '../constants/constants'
import IconButton from '@mui/material/IconButton';

import {Paper,Grid,Typography,Stack,Button,TextField,Autocomplete,Box} from '@mui/material'
const HomeSection = styled.section`
height:calc(100vh+180px);
position:relative;
`
const SendIcon  = styled(IoSend)`
width : 40px;
height:40px;
color:white;

`
const Container = styled.div`
width:100%;
height:60%;
padding: 80px 20px;
display:flex;
justify-content:space-evenly;
flex-direction: column;
background-image: url(${Bg});
background-size:   cover;
background-repeat: no-repeat;
background-position: center;
position: relative;
`


const HeaderInfo = styled.div`
margin:auto;`

const Title  = styled.h1`
font-weight: bolder;
color:white;
letter-spacing:0.2px;
font-family: 'Regular 400 Italic';

@media screen and (max-width:600px) {
  font-size: 25px;
}
`
const P = styled.p`
font-size: 18px;
color:white;
font-family: 'Regular 400';
`


const HomePfe = () => {
  const [section,setsection] = React.useState('sale-homes');
  const [loc,setlocation] = React.useState('see ads in all lebanon');
  const [inputValue, setInputValue] = React.useState('');
  const navigate=useNavigate()
  return (
    <>
<HomeSection>
  <Container>
    <HeaderInfo>
<Title>
  Easiest Way to find
  your dream place
</Title>
<P>this is where you can find a dream ,place for you of various types,<br/>all over the world at affordable price</P>
<form>
  {console.log(section)}
<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" className="btn-check " name="btnradio" id="btnradio1"  value={section} onClick={()=>setsection('sale-homes')} checked />
  <label className="btn btn-outline-primary " for="btnradio1">buy</label>
  <input type="radio"  name="btnradio" className="btn-check" id="btnradio2"  value={section}  onClick={()=>setsection('rental-homes')}/>
  <label className="btn btn-outline-info" for="btnradio2">rent</label>
  </div>
  <Stack direction ='row' >
       <Autocomplete 
      id="filter-demo"
      sx={{width:'100%',height:'50px'}}
      value={loc}
      onChange={(event, newValue) => {
        setlocation(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={locations.map((loc)=>{return loc.location})}
      renderInput={(params) => <TextField sx={{backgroundColor:'white'}} {...params}/>}
    />
      <IconButton type="submit"  aria-label="search" sx={{color:'white'}}>
       <SendIcon onClick={()=>navigate(`ad/${section}?location=${loc}`)}/>
      </IconButton>
      </Stack>
        
    
    </form>
    </HeaderInfo>
 
  </Container>
  
  <Grid container direction="row" justifyContent="flex-start"  spacing={2} sx={{height:'45vh',pt:5,paddingLeft:'10px',backgroundColor:'#F3F7FF'}}>
<Grid item xs={6} sx={{height:"100%",display:'flex',justifyContent:'flex-end'} }>   
  <img style={{width:'80%',height:'90%'}} className=" rounded " src={Img1} alt="family img"/>
  </Grid>
<Grid item xs={6} sx={{height:"50%"}}>
 
    <Typography variant="h5" sx={{fontFamily:'bold',textAlign:'left',pb:1}}>Are You Looking For Best Property <br/> Near You</Typography>
    <Typography variant="subtitle1">we make it easy for you to find the right property<br/>Find your place with an immersive photo experience and the most listings,<br/> including things you won’t find anywhere else.
  <Stack direction='row' sx={{mt:1}} spacing={1}>
  <Button variant="outlined" color="secondary"  size="medium" onClick={()=>navigate('/ad/sale-homes')}>
         search homes
        </Button>
        <Button variant="outlined" color="primary" size="medium" onClick={()=>navigate('/ad/rental-homes')}>
          find rentals
        </Button>
  </Stack>
</Typography>
</Grid>

  
</Grid>
<Grid container  direction="row" justifyContent="flex-end"  spacing={2} sx={{height:'45vh',pt:5,paddingLeft:'10px',backgroundColor:'#F3F7FF'}}>
<Grid item xs={6} sx={{height:"50%"}}>
 
    <Typography variant="h5" sx={{fontFamily:'bold',textAlign:'right',pb:1}}>we Help You To Find  Best Property <br/> for living</Typography>
    <Typography variant="subtitle1" sx={{textAlign:'right'}}>We believe that a home is the foundation of a family's future.
Buying<br/> or selling a property requires a lot of time and dedication.<br/>
our goal is let you search to the right property easier or selling it faster</Typography>
</Grid>

  <Grid item  xs={6} sx={{height:"100%"} }>   
  <img style={{width:'80%',height:'90%'}} className="rounded " src={Img} alt="family img"/>
  </Grid>
</Grid>

<Footer/>
</HomeSection>

</>
  )
}

export default HomePfe