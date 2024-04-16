"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  TextField,
  Grid,
  Radio,
  Container,
  Typography,
  IconButton
} from "@mui/material";
import { Store } from "@/context/dataStore";
import {
  BusinessOutlined,
  Delete,
  Edit,
  HomeOutlined,
  LocationOnOutlined,
  PushPinOutlined
} from "@mui/icons-material";
import AddAddress from "@/components/home/AddAddress";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function page() {
  const router = useRouter();
  const { address, decodeUserInfo, shippingAddress } = Store();
  const [choese, setChoese] = useState(shippingAddress?._id || '');
  const [newAddress, setNewAddress] = useState(true);
  const [editAddress, setEditAddress] = useState("");

  const close = () => {
    setNewAddress(true);
  };
  const placeOrder = async () => {
    if (!choese) {
      enqueueSnackbar("Please select address to shipping", {
        variant: "error"
      });
      return;
    }

    router.push("/place_order");
  };
  const deleteAddres = async (itemId) => {
    await axios
      .delete(`/add_address/${itemId}`)
      .then((res) => {
        decodeUserInfo();
        enqueueSnackbar(`${res.data.message}`, {
          variant: "success"
        });
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data.message}`, {
          variant: "error"
        });
        console.log(err);
      });
  };
  return (
    <Box>
      <Typography
        py={10}
        textAlign={"center"}
        variant="h4"
        component={"h1"}
        textTransform={"capitalize"}
      >
        Shipping Address
      </Typography>
      {address ? (
        <Container>
          <Grid container spacing={1}>
            {address?.address.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{ border: "solid .5px gray", borderRadius: "20px" }}
                  p={2}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                >
                  <Radio
                    checked={
                      item._id === choese ? true : false
                    }
                    onChange={(e) => {
                      setChoese(e.target.value),
                        setCookie("shippingAddress", JSON.stringify(item));
                        decodeUserInfo();
                    }}
                    value={item._id}
                  />
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    width={"100%"}
                  >
                    <Box>
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        variant="body1"
                        color="initial"
                      >
                        <LocationOnOutlined /> City : {item.city} {" , "}
                        Area : {item.area} , Street : {item.street}
                      </Typography>
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        variant="body1"
                        color="initial"
                      >
                        <BusinessOutlined /> Name : {item.build.name} {" , "}
                        Number : {item.build.number}
                      </Typography>
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        variant="body1"
                        color="initial"
                      >
                        <HomeOutlined /> Floor : {item.floor} {" , "}
                        Partment : {item.partment}
                      </Typography>
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        variant="body1"
                        color="initial"
                      >
                        <PushPinOutlined /> Mark : {item.mark}
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      <IconButton
                        onClick={() => {
                          setEditAddress(item._id);
                          setNewAddress(false);
                        }}
                      >
                        <Edit sx={{ color: "#f0c000" }} />
                      </IconButton>
                      <IconButton onClick={() => deleteAddres(item._id)}>
                        <Delete sx={{ color: "#09c" }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"space-between"}
              mt={1}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setNewAddress(false);
                  setEditAddress("");
                }}
              >
                add new address
              </Button>
              <Button
                onClick={placeOrder}
                variant="contained"
                sx={{
                  bgcolor: "#f0c000",
                  color: "#203040",
                  fontWeight: 700,
                  ":hover": { bgcolor: "#09c" }
                }}
              >
                place order
              </Button>
            </Grid>
            <Grid item xs={12} display={newAddress ? "none" : "block"}>
              <AddAddress data={editAddress} fun={close} />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <AddAddress data={editAddress} fun={close} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
