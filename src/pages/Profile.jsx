import React, { useState } from 'react'
import styled from 'styled-components'
import { Link ,Outlet,useNavigate} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import { useSelector } from 'react-redux'


const Content = styled.div`
    @media screen and (max-width:768px){
        flex-direction: column;
        
    }
`

export const sections = [
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
];

const Profile = () => {
    const [open, setOpen] = React.useState(false);
const auth= useSelector((state)=>state.user.user);
console.log(auth)
{return auth !=null ?(      
        <div style= {{height:'auto'}}className='bg-light'>
            <div className=' bg-white rounded p-1'>
{console.log(auth)}
<Content className="w-100 ">                   
<Outlet/>
 </Content>       
            </div>
        </div> ): <div>pls signup first</div>
}
}

export default Profile