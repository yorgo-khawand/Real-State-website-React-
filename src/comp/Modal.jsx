import { createPortal } from "react-dom";
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { login } from '../features/User/userSlice'
import { useDispatch ,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { closeModal } from "../features/Modal/ModalSlice";
import {getSavedPost} from '../features/SavedPosts/SavedpostSlice';

const Modal = () => {    
    const [section,seSection] = useState('login')
    const dispatch = useDispatch();
    const Mod = useSelector(state=>state.modal.displayModal);
    const {error,isSuccess} = useSelector(state=>state.user)
          
const Login =()=>{
    const [loginData,setloginData] = useState({email:'',password:'',showPassword: false,});
    const [errors,setErrors] = useState({email:null,password:null});
    const validate = ()=>{
      let tmp = {};
      tmp.email = loginData.email== ''?'email is required':'';
      tmp.password = loginData.password== ''?'password is required':'';
      setErrors({...tmp})
      return Object.values(tmp).every(x=>x=='')   }
    const onChange=(e)=>{
        setloginData((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value}))}   
    const onSubmit =(e)=>{
        e.preventDefault();
        if(validate()){
        let form =new FormData();
        form.append('email',loginData.email);
        form.append('password',loginData.password);
         dispatch(login(form));  
            
      }
    }
      const handleClickShowPassword = () => {
        setloginData({
          ...loginData,
          showPassword: !loginData.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    isSuccess == true && dispatch(closeModal())
    return(

    <>
    <DialogTitle ><span className="fs-5 text-primary">login</span></DialogTitle>
    <form onSubmit={(e)=>{onSubmit(e);setloginData({['email']:'',['password']:''})}}>
    <DialogContent>
    <Box noValidate component="form"
          sx={{display: 'flex', flexDirection: 'column',  m: 'auto', width: 350, }}>
      <TextField  margin="dense" id="email"  label="Email Address" type="email" fullWidth name='email'  onChange={onChange} value = {loginData.email} {...(errors.email &&{error:true,helperText:errors.email})}  />
        <OutlinedInput  sx={{m:'5px 0px 0px 0px'}} id="password" name="password"  type={loginData.showPassword ? 'text' : 'password'} value={loginData.password}  placeholder={"password"} {...(errors.password &&{error:true})}   onChange={onChange}  endAdornment={
            <InputAdornment  position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {loginData.showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </IconButton>
            </InputAdornment>
          }
          label="password"/>
          <FormHelperText sx={{color:'red'}}>{errors.password!=null&&errors.password}</FormHelperText>
          </Box>
          {error!=null && <span className="fs-6 text-danger">{error}</span>}
    </DialogContent>
    <DialogActions>
    <input  style={{outline:'none',resize:'none',cursor:'pointer',backgroundColor:'#198cf1'}} type="submit" className='w-50 p-2 rounded  border text-white d-block'/>
    </DialogActions>
    </form>
    <DialogContentText>
      <p className="fs-6 text-dark ms-1" >Dont have an account? <span onClick={()=>seSection('signup')}className="text-primary fs-6">signup</span></p> 
      </DialogContentText>  
     
      </>)
}
const Signup =()=>{
    const [signupData,setsignupData] = useState({name:'',email:'',password:'',showPassword: false,});
    const [errors,setErrors] = useState({name:null,email:null,password:null});
    const validate = ()=>{
      let tmp = {};
      tmp.name = signupData.name== ''?'name is required':'';
      tmp.email = signupData.email== ''?'email is required':'';
      tmp.password = signupData.password== ''?'password is required':'';
      setErrors({...tmp})
      return Object.values(tmp).every(x=>x=='')
      
    }
    const onChange=(e)=>{
        setsignupData((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
        }))
      }  
    const onSubmit =(e)=>{
        e.preventDefault();
        if(validate()){
        let form =new FormData();
        form.append('name',signupData.name)
        form.append('email',signupData.email);
        form.append('password',signupData.password);
         dispatch(closeModal())     }}

         const handleClickShowPassword = () => {
            setsignupData({
              ...signupData,
              showPassword: !signupData.showPassword,
            });
          };
        
          const handleMouseDownPassword = (event) => {
            event.preventDefault();
          };
    return(
    <>
    <DialogTitle ><span className="fs-5 text-primary">Sign up</span></DialogTitle>
    <form onSubmit={(e)=>{onSubmit(e);setsignupData({['email']:'',['password']:''})}}>
    <DialogContent>
    <Box noValidate component="form"
          sx={{display: 'flex', flexDirection: 'column',  m: 'auto', width: 350, }}>
      <TextField  margin="dense" id="name"  label="Name" type="name" fullWidth         name='name'   onChange={onChange}           value = {signupData.name} {...(errors.name &&{error:true,helperText:errors.name})}/>
      <TextField  margin="dense" id="email"  label="Email Address" type="email" fullWidth         name='email'   onChange={onChange}           value = {signupData.email}  {...(errors.email &&{error:true,helperText:errors.email})} />
        <OutlinedInput sx={{m:'5px 0px 0px 0px'}} id="password" name="password" type={signupData.showPassword ? 'text' : 'password'} value={signupData.password} placeholder={"password"}  onChange={onChange} {...(errors.password &&{error:true})} endAdornment={
            <InputAdornment position="end">
              <IconButton   aria-label="toggle password visibility"  onClick={handleClickShowPassword}   onMouseDown={handleMouseDownPassword}  edge="end"
              >
                {signupData.showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </IconButton>
            </InputAdornment>
          }
          label="password"/>
           <FormHelperText sx={{color:'red'}}>{errors.password!=null&&errors.password}</FormHelperText>
          </Box>
    </DialogContent>
    <DialogActions>
    <input  style={{padding:'16px 10px',outline:'none',resize:'none',cursor:'pointer',backgroundColor:'#198cf1'}} type="submit" className='w-50 p-2 rounded  border text-white d-block'/>
    </DialogActions>
    </form>
    <DialogContentText>
      <p className="fs-6 text-dark ms-1" >Dont have an account? <span onClick={()=>seSection('login')}className="text-primary fs-6">signup</span></p> 
      </DialogContentText>   
      </>)
}
  return createPortal(
    <Dialog open={Mod} onClose={()=>dispatch(closeModal())} maxWidth={'sm'} >

    {section == 'login'?<Login/>:<Signup/>} 
    </Dialog>
      ,document.getElementById('modal-root')
  )
}

export default Modal