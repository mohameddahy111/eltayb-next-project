"use client"
import {Box, Grid} from "@mui/material";
import {Store} from "@/context/dataStore";
import UsersTabs from "@/components/users/UsersTabs";
import {Search} from "@/components/users/Search";

export default function Layout({children}) {
  const {mobileDivices} = Store()
  return (
   <Box>
     <Grid container spacing={1}>
       {!mobileDivices && (
        <Grid item md={3}>
          <UsersTabs/>
        </Grid>
       )}
       <Grid item md={9} xs={12}>
         <Search/>
         <main>
           {children}
         </main>
       
       </Grid>
     </Grid>
   </Box>
  )
}