"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Card,
  Table,
  Typography,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  Divider,
  Chip,
  Button
} from "@mui/material";
import { Store } from "@/context/dataStore";
import { useRouter } from "next/navigation";

export default function page({}) {
  const router = useRouter()
  const { userInfo, cartItems, shippingAddress, decodeUserInfo } = Store();
  const [data, setData] = useState(false);
  const tax = (cartItems?.total_cart_price * 15) / 100;
  const delivery = 20;
  useEffect(() => {
    if ((userInfo, cartItems && shippingAddress)) {
      setData(true);
    } else {
      setData(false);
    }
  }, [userInfo , cartItems, shippingAddress]);

  async function placeOrder() {
    setData(false)
    await axios
      .post("/orders/", { choese: shippingAddress._id })
      .then((res) => {
        if (res.status === 200) {
          decodeUserInfo()
          router.push('/')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Box py={5}>
      {data ? (
        <Container>
          <Grid container spacing={1}>
            <Grid item md={8} xs={12}>
              <Typography py={3} variant="h5" color="initial">
                User Information
              </Typography>
              <Grid container spacing={1}>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Name"
                    value={userInfo?.name}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Email"
                    value={userInfo?.email}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Mobile"
                    value={userInfo?.mobile}
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography py={3} variant="h5" color="initial">
                Delivery Information
              </Typography>
              <Grid container spacing={1}>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="City"
                    value={shippingAddress.city}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Area"
                    value={shippingAddress.area}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Street"
                    value={shippingAddress.street}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Bulid Name"
                    value={shippingAddress.build?.name}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Bulid Number"
                    value={shippingAddress.build?.number}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Floor"
                    value={shippingAddress.floor}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Partment"
                    value={shippingAddress.partment}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <TextField
                    fullWidth
                    id=""
                    label="mark"
                    value={shippingAddress.mark}
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <Typography py={3} variant="h5" color="initial">
                Purchases Information
              </Typography>
              <Grid item xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Product Name</TableCell>
                        <TableCell align="center">Size</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Offer %</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">
                            {item.productName}
                          </TableCell>
                          <TableCell align="center">{item.size}</TableCell>
                          <TableCell align="center">{item.quantity}</TableCell>
                          <TableCell align="center">
                            {item.final_price}
                          </TableCell>
                          <TableCell align="center">
                            {item.offer_value} %
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography variant="h6" textTransform={"capitalize"}>
                        {" "}
                        total items{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      ( {cartItems.total_cart_quantity} ) items
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography variant="h6" textTransform={"capitalize"}>
                        total price
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {cartItems.total_cart_price} EP
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography variant="h6" textTransform={"capitalize"}>
                        tax
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {tax} EP
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography variant="h6" textTransform={"capitalize"}>
                        delivery
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {delivery} EP
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography
                        color={"error"}
                        variant="h6"
                        textTransform={"capitalize"}
                      >
                        Descount
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography color={"error"}>
                        {cartItems.total_Cart_After_Discount -
                          cartItems.total_cart_price}{" "}
                        EP{" "}
                      </Typography>
                    </Grid>
                  </ListItem>
                  <Divider>
                    <Chip label={"total"} />
                  </Divider>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography variant="h6" textTransform={"capitalize"}>
                        total
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {cartItems.total_Cart_After_Discount + tax + delivery} EP
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button fullWidth variant="contained" onClick={placeOrder}>
                      place order
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : <Box>
        <Typography variant="h6" textTransform={"capitalize"} textAlign={'center'}>
          your requset is prossing place wait ...... 
        </Typography>
      </Box>}
    </Box>
  );
}
