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

export default function page({ params }) {
  const router = useRouter();
  const { userInfo } = Store();
  const { orderId } = params;
  const [data, setData] = useState("");
  async function getOrder() {
    await axios
      .get(`/orders/place_order/${orderId}`)
      .then((res) => {
        setData(res.data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (userInfo) {
      getOrder();
      
    } else {
      router.push('/login')
    }
  }, []);
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
                    value={data.shipping_Details.city}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Area"
                    value={data.shipping_Details.area}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Street"
                    value={data.shipping_Details.street}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Bulid Name"
                    value={data.shipping_Details.build.name}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Bulid Number"
                    value={data.shipping_Details.build.number}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Floor"
                    value={data.shipping_Details.floor}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id=""
                    label="Partment"
                    value={data.shipping_Details.partment}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <TextField
                    fullWidth
                    id=""
                    label="mark"
                    value={data.shipping_Details.mark}
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
                      {data.items.map((item, index) => (
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
                      ( {data.items.reduce((a, c) => a + c.quantity, 0)} ) items
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography variant="h6" textTransform={"capitalize"}>
                        total price
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {data.total_price} EP
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography variant="h6" textTransform={"capitalize"}>
                        tax
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {(data.total_price * data.tax) / 100} EP
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography variant="h6" textTransform={"capitalize"}>
                        delivery
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {data.delivery} EP
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
                        {data.toatl_After_Descount - data.total_price} EP{" "}
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
                      {data.payment_total} EP
                    </Grid>
                  </ListItem>
                  {/* <ListItem>
                    <Button fullWidth variant="contained">
                      place order
                    </Button>
                  </ListItem> */}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </Box>
  );
}
