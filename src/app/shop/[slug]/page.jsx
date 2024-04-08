"use client"
import {Box, Button, Card, CardMedia, Chip, Container, Grid, List, ListItem, Typography} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import {SwiperShow} from "@/components/home/SwiperShow";
import {ShoppingCartOutlined} from "@mui/icons-material";
import {Store} from "@/context/dataStore";
import {AddToCartDialog} from "@/components/home/AddToCartDialog";

export default function SlugPage({params}) {
  const {mobileDivices} = Store()
  const [product, setProduct] = useState({});
  const [swiperData, setSwiperData] = useState([]);
  const [showOrder , setShowOrder] = useState(false);
  const {slug} = params;
  const getData = async () => {
    await axios.get(`products/${slug}`).then((res) => {
      setProduct(res.data.product)
      getSwiperData(res.data.product.brand._id)
    }).catch((err) => {
      console.log(err)
    });
  }
  
  async function getSwiperData(id) {
    console.log(id)
    await axios.post(`products/`, {brand_id: id}).then((res) => {
      setSwiperData(res.data.sameProduct)
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  
 
  
  useEffect(() => {
    if (slug) {
      getData()
    }
  }, [slug]);
  
  async  function addToCart(){
    console.log('hiii')
  }

  return (<>
    
    <Container>
      <Grid container spacing={1}>
        <Grid md={3} item xs={12}>
          <Card>
            <CardMedia component={'img'} src={product?.image?.scr} alt={`${product?.name} image`}/>
          </Card>
        </Grid>
        <Grid md={6} item xs={12}>
          <List>
            <ListItem>
              <Typography textTransform={'capitalize'} variant="h4" color="" component="h4">
                {product?.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography color="" component="h4">
                {product?.description}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography color="" component="h4">
                {product?.category?.name}
              </Typography>
              &nbsp; &nbsp; &nbsp;  &nbsp;
              <Typography color="" component="h4">
                {product?.brand?.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Grid container spacing={1}>
                {product?.price?.map((x, index) => (
                 <Grid md={2} item xs={4} key={index}>
                   {x?.offer ? (
                    <Box display="flex" flexDirection="column-reverse">
                      <Chip color="success" label={`save ${x?.value_of_offer} %`}/>
                      <Typography color={'green'}> <Typography
                       component={'span'}
                       className={'price-remov'}>{x.value} </Typography> {x?.final_price} EP</Typography>
                      <Typography color={'green'}> {x.size} </Typography>
                      {x.size === "Small" || x.size === "Medium" || x.size === 'Large' ? (
                       <Image src={'../cups.svg'} alt={'cup'}
                              width={x.size === "Small" ? 40 : x.size === 'Medium' ? 50 : 60}
                              height={x.size === "Small" ? 40 : x.size === 'Medium' ? 50 : 60}/>
                      ) : <Image src={'../kg.svg'} alt={'kg'}
                                 width={x.size === "1/4 Kg"
                                  ? 40 : x.size === '1/2 Kg' ? 50 : 60}
                                 height={x.size === "1Kg" ? 40 : x.size === 'Medium' ? 50 : 60}/>}
                    </Box>) : (
                    <Box>
                      {x.size === "Small" || x.size === "Medium" || x.size === 'Large' ? (
                       <Image src={'../cups.svg'} alt={'cup'}
                              width={x.size === "Small" ? 40 : x.size === 'Medium' ? 50 : 60}
                              height={x.size === "Small" ? 40 : x.size === 'Medium' ? 50 : 60}/>
                      ) : <Image src={'../kg.svg'} alt={'kg'}
                                 width={x.size === "1/4 Kg"
                                  ? 40 : x.size === '1/2 Kg' ? 50 : 60}
                                 height={x.size === "1Kg" ? 40 : x.size === 'Medium' ? 50 : 60}/>}
                      <Typography> {x.size} </Typography>
                      <Typography>  {x?.final_price} EP</Typography>
                    
                    </Box>
                   )}
                 </Grid>
                ))}
              </Grid>
            </ListItem>
            <ListItem>
            </ListItem>
          </List>
        </Grid>
        <Grid md={3} item xs={12} mt={!mobileDivices && 5}>
          <Card>
            <List>
              <ListItem>
                <Grid item xs={12}>
                  <Typography textTransform={'capitalize'} variant={'body2'}>available </Typography>
                
                </Grid>
                
                <Grid item xs={12}>
                  {product?.product_available ?
                   <Typography textTransform={'capitalize'} color={'green'}>available </Typography> :
                   <Typography variant={'body2'} textTransform={'capitalize'} color={'red'}> not
                     available </Typography>}
                </Grid>
              </ListItem>
              <ListItem>
               <AddToCartDialog data={product}/>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <Box py={5}>
        
        <Typography variant={"h5"} component={'h3'} className={"sub-title"}>
          More with {product?.name}
        </Typography>
        <SwiperShow data={swiperData} link/>
      </Box>
    </Container>˝
  </>)
}