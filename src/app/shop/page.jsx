'use client'
import {useEffect, useState} from "react";
import {useGetData} from "@/hooks/getData";
import {Card, CardActionArea, CardActions, CardMedia, Container, Grid, IconButton, Typography} from "@mui/material";
import ProductSearch from "@/components/dashboard/ProductSearch";
import {FavoriteBorder, MonitorHeartOutlined} from "@mui/icons-material";

export default function ShopPage() {
  const {data} = useGetData('products/')
  const [prodected, setProdected] = useState(data);
  useEffect(() => {
    if (data) {
      setProdected(data)
    }
  }, [data]);
  return (
   <>
     <ProductSearch/>
     {prodected ? (
      <Container sx={{paddingY: 4}}>
        <Grid container spacing={1}>
          {prodected.map((item, index) => (
           <Grid item md={3} xs={12} key={index}>
             <Card>
               <CardMedia component={'img'} src={item.image.scr} height="400px"/>
               <CardActions>
                 <CardActionArea  href={`/shop/${item.slug}`}>
                   <Typography variant="h6" fontSize={'20px'} component='h2' color="textSecondary">
                   {item.name}
                   </Typography>
                 </CardActionArea>
                 <IconButton>
                   <FavoriteBorder/>
                 </IconButton>
               </CardActions>
             
             </Card>
           </Grid>
          ))}
        </Grid>
      
      </Container>
     ) : null}
   </>
  )
}