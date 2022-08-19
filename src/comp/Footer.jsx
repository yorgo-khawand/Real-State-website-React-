import React,{useRef} from 'react'
import styled from 'styled-components'
import Client from './Client';
import emailjs from "@emailjs/browser";
const Container = styled.div`
background-color: #0c69b9;
    width:100%;
    height:43vh;
   
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap:wrap;
`
const Categories = styled.div`
    width:30%;
    height: 70%;
    padding-top:5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    color:white;
    flex:1;
`
const Title  = styled.h3`
    color:white;
    font-weight: 300;
`
const Content = styled.p`
color:white;`


const Footer = () => {
    const form = useRef();
    const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_dflq7lf', 'template_k1z0gra',form.current, 'JmecosFGIMEoVmuAc')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
}

  return (
    <Container>
<Categories className='border-end'>
<Title>who we are</Title>
<Content>We believe that a home is the foundation of a family's future.<br/>Buying or selling a property requires a lot of time and dedication.<br/>our goal is let you search to the right property easier or selling it faster</Content>
</Categories>
 <Categories className='border-end'>
<Title>Categories</Title>
    <span>Appartments for sale</span>
    <span>Appartments for rent</span>
    <span>Lands for sale</span>
    <span>Lands for rent</span>
</Categories> 
<Categories >
<Title>Contact us</Title>
<form ref={form} onSubmit={sendEmail}>
<div className='d-flex align-items-center mb-2'>
{/* <label htmlFor='name' className='w-auto pe-1 d-inline-block fw-bolder ' >Name</label> */}
 <input style={{padding:'5px 10px',outline:'none',resize:'none',cursor:'pointer'}} placeholder="enter your name" className="w-100 bg-white border rounded" type='text' name="user_name" ></input>
</div>
<div className='d-flex align-items-center'>
{/* <label className='w-auto pe-1 d-inline-block fw-bolder ' >Email</label> */}
 <input style={{padding:'5px 10px',outline:'none',resize:'none',cursor:'pointer'}} placeholder="enter your email" className="w-100 bg-white border rounded" type='text' name="user_email" ></input>
</div>
<div className='d-flex'>
{/* <label className='w-100 d-inline-block fw-bolder ' >description</label> */}
<textarea style={{outline:'none',resize:"none",cursor:'pointer'}} name="message" placeholder='I would love to know more about this property' cols="20" rows='3' className='w-100 mt-2 p-2 rounded-1'/>
</div>
<div>
<input value="Send"  style={{color:'#198cf1'}} type="submit" className=' w-25 rounded border-0 bg-white mt-1 d-block'/>
</div>
</form>
</Categories>
<Client/>
    </Container>
  )
}

export default Footer