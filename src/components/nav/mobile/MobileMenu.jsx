"use client"
import React, {useState} from "react";
import {Box, Button, Drawer, IconButton, List, ListItemButton, Typography} from "@mui/material";
import {MenuOutlined} from "@mui/icons-material";
import styles from "@/app/sass/nave.module.scss";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import {topList} from "@/data/data";
import {useRouter} from "next/navigation";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Store} from "@/context/dataStore";
import UserMenu from "@/components/nav/users/UserMenu";
import Register from "@/components/nav/users/Register";

export const MobileMenu = () => {
  const {userInfo} = Store()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const openHandler = () => {
    setOpen(true)
  }
  const closeHandler = () => {
    setOpen(false)
  }
  const clickAction = (path) => {
    router.push(path)
    closeHandler()
  }
  return (
   <>
     <Tooltip title={'menu'}>
       <Button onClick={openHandler}>
         <MenuOutlined/>
       </Button>
     
     </Tooltip>
     <Drawer open={open} onClose={closeHandler} anchor={'left'}>
       <Box minWidth="250px">
         <Box className="box-flex-between" p={2}>
           <Typography
            component={"a"}
            href="/"
            className={styles.title}
            variant="h4"
           >
             hello world
           </Typography>
           <Tooltip title={'close'}>
             <IconButton onClick={closeHandler} color="inherit">
               <CloseIcon/>
             </IconButton>
           
           </Tooltip>
         </Box>
         <Divider/>
         <Box display={'flex'} justifyContent={'space-between'} flexDirection='column' height={"100%"}>
           <List sx={{height: '500px'}}>
             {topList.map((item, index) => (
              <ListItemButton onClick={() => {
                clickAction(item.path)
              }} key={index}>
                <ListItemIcon> {item.icon}</ListItemIcon>
                <Typography textTransform='capitalize'>
                  {item.title}
                </Typography>
              </ListItemButton>
             ))}
           
           </List>
           <Box>
             <Divider/>
             {userInfo ? (
              <Box display={'flex'} justifyContent={'start'} alignItems={'center'} gap={2}>
                <UserMenu/>
                <Typography textTransform='capitalize'>
                  {userInfo.name}
                </Typography>
              
              </Box>
             ) : (<Box className={'box-flex-center'}>
               <Register/> / <Button onClick={() => {
               clickAction('/login')
             }} variant={'text'}>Login </Button>
             </Box>)}
           
           </Box>
         </Box>
       </Box>
     
     </Drawer>
   
   </>
  )
}