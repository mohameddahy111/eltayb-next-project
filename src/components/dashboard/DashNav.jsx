import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import styles from "@/app/sass/nave.module.scss";
import {MobileMenu} from "@/components/nav/mobile/MobileMenu";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Store} from "@/context/dataStore";
import {useSnackbar} from "notistack";
import UserMenu from "@/components/nav/users/UserMenu";

export const DashNav = () => {
  const route = useRouter()
  const {userInfo, mobileDivices  , setAdmin} = Store()
  const {enqueueSnackbar , closeSnackbar} = useSnackbar()
  useEffect(()=>{
    closeSnackbar()
    if(!userInfo || !userInfo?._isAdmin){
      enqueueSnackbar("you are not logged in" , {variant :'error'})
      setAdmin(false)
      route.push('/')
    }
  },[userInfo])
  return (
   <nav>
     <AppBar position="static" elevation={0} sx={{bgcolor: "transparent"}}>
       <Toolbar>
         <Box className="box-flex-between">
           <Box py={2}>
             <Typography
              
              className={styles.title}
              variant="h4"
             >
               El-tayb Dashboard
             </Typography>
             <Typography variant="caption" color={'#09c'} textTransform={'capitalize'}>
              ( Admin {userInfo?.name} is Active )
             </Typography>
           </Box>
           <Box hidden={!mobileDivices}><MobileMenu/> </Box>
           <Box hidden={mobileDivices}>
           
           </Box>
           <Box hidden={mobileDivices}>
           <UserMenu/>
           
           </Box>
         
         </Box>
       </Toolbar>
     </AppBar>
   </nav>
  )
}