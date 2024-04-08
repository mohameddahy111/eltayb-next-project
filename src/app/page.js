"use client"
import styles from "./sass/styles.module.scss";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import Image from "next/image";
import {Store} from "@/context/dataStore";
import {ArrowRight} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import {useGetData} from "@/hooks/getData";
import {SwiperShow} from "@/components/home/SwiperShow";

export default function Home() {
  const {data} = useGetData('brand/')
  const router = useRouter()
  const {mobileDivices} = Store()
  return (
   <Box p={2} position='relative'>
     <Box p={5} my={5} className={`${styles.boxTitle}`}>
       <Typography component="h1" variant="h1" textAlign='center' width={mobileDivices ? "300" : '500px'}
                   textTransform='capitalize'>
         this app show prodects for sele!
       </Typography>
       <Typography component="h3" variant="h3" textAlign='center' py={4}>
         Welcome to the App! we are
       </Typography>
     </Box>
     <Box p={2} position='relative'>
       <Grid container spacing={mobileDivices ? 5 : 1}>
         <Grid item xs={12} md={4} display={'flex'} justifyContent={'center'}>
           <Box className={styles.clip}>
             <Image src={"https://i.pinimg.com/564x/63/52/e0/6352e04c490080b319a7db296da60eb2.jpg"} alt={"tometo"}
                    width={300} height={300}/>
           </Box>
         </Grid>
         <Grid item xs={12} md={4} display={'flex'} justifyContent={'center'}>
           <Box className={styles.clip}>
             <Image src={"https://i.pinimg.com/564x/c4/4b/e4/c44be42a8ad227ebe44a621532c93c44.jpg"} alt={"tometo"}
                    width={300} height={300}/>
           </Box>
         
         </Grid>
         <Grid item xs={12} md={4} display={'flex'} justifyContent={'center'}>
           <Box className={styles.clip}>
             <Image src={"https://i.pinimg.com/736x/8a/b7/3e/8ab73e8b1a5643c664c2036949374598.jpg"} alt={"tometo"}
                    width={300} height={300}/>
           </Box>
         </Grid>
       
       
       </Grid>
     
     
     </Box>
     
     <Container sx={{py: 5}}>
       <Box width={"100%"} className={'box-flex-center'}>
         <Button onClick={() => router.push('/login')} size='large' variant="contained" className={styles.StartBtn}
                 endIcon={<ArrowRight/>}>
           Start now
         </Button>
       </Box>
       
       <SwiperShow data={data}/>
     
     
     </Container>
   </Box>
  );
}
