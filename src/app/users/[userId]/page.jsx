"use client"
import {Box, IconButton, InputBase, TextField} from "@mui/material";
import {Store} from "@/context/dataStore";
import {Search} from "@/components/users/Search";




export default function page({params}) {
  const {userInfo} = Store()
  const {userId} = params;
  return (
   <Box >
 
 
   </Box>
  );
}
