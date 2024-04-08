import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Add, MoreVert, Person, Send} from "@mui/icons-material";
import {IconButton, ListItemText} from "@mui/material";
import {useRouter} from "next/navigation";
import {Store} from "@/context/dataStore";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";

export default function OptionsFrindsList({item}) {
  const router = useRouter()
  const {userInfo} =Store()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
   <div>
     <IconButton
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
     >
    <MoreVert/>
     </IconButton>
     <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
        "className": "profileList",
      }}
   
     >
       <MenuItem  onClick={()=> {
         router.push(`/users/${userInfo._id}/frindes/${item._id}`);
         handleClose()
       } }>
        <ListItemIcon> <Person/> </ListItemIcon>
         <ListItemText>profile </ListItemText>
       </MenuItem>
       <MenuItem onClick={handleClose}>
         <ListItemIcon><Add/> </ListItemIcon>
         <ListItemText>
           Add frind
         </ListItemText>
     
       </MenuItem>
       <MenuItem onClick={handleClose}>
         <ListItemIcon>
           <Send/>
         </ListItemIcon>
         <ListItemText>
           send message
         </ListItemText>
      
       </MenuItem>
     </Menu>
   </div>
  );
}