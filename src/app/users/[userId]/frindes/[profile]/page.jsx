import {Box, Button, Card, Container, Grid, List, ListItem, Typography} from "@mui/material";
import Image from "next/image";

const getInfo = async (profile) => {
  const data = await fetch(`http://localhost:3000/api/frindes/${profile}`, {cache: 'no-store'})
  if (data.ok) {
    return await data.json()
  } else {
    throw new Error('Failed to fetch data')
  }
}
export default async function page({params}) {
  const {profile} = params;
  const info = await getInfo(profile);
  const {user} = info;
  console.log(info)
  return (
   <Box pt={10}>
     <Container>
       <Grid container spacing={1}>
         <Grid item md={4} xs={12}>
           <Image src={"https://i.pinimg.com/564x/e8/7a/b0/e87ab0a15b2b65662020e614f7e05ef1.jpg"} alt={"profile"}
                  width={300} height={300}/>
         </Grid>
         <Grid item md={4} xs={12}>
           <List>
             <ListItem>
               Name :
               <Typography>
                 {user.name}
               </Typography>
             </ListItem> <ListItem>
             Email :
             <Typography>
               {user.email}
             </Typography>
           </ListItem> <ListItem>
             Mobile :
             <Typography>
               {user.mobile}
             </Typography>
           </ListItem>
           
           </List>
         
         
         </Grid>
         <Grid item md={4} xs={12}>
           <Card>
             <List>
               <ListItem>
                 <Button fullWidth variant="contained"
                         sx={{bgcolor: '#f0c000', color: "#203040", ":hover": {bgcolor: "#f0c111"}}}>
                   add to firndes
                 </Button>
               </ListItem> <ListItem>
               <Button fullWidth variant="contained" color="error">
                 Blocked
               </Button>
             </ListItem>
             </List>
           </Card>
         </Grid>
       </Grid>
     </Container>
   </Box>
  )
}