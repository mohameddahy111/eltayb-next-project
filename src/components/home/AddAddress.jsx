import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, InputAdornment, Button } from "@mui/material";
import { Store } from "@/context/dataStore";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import {
  BusinessOutlined,
  EighteenUpRatingOutlined,
  LocationOnOutlined,
  Map,
  SignpostOutlined
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

export default function AddAddress({ data , fun }) {
  const { enqueueSnackbar } = useSnackbar();
  const { address, decodeUserInfo } = Store();
  const [getAddress, setGetAddress] = useState(null);
  const editAddress = address?.address?.find((ele) => ele._id === data);

  useEffect(() => {
    if (editAddress) {
      setGetAddress(editAddress);
      Object.keys(formik.values).map((key) => {
        formik.values[key] = editAddress[key];
      
      });
    } else {
      setGetAddress(null);
      Object.keys(formik.values).map((key) => {
        if (key === "build") {
          formik.values.build.name = "";
          formik.values.build.number = "";
        } else {
          formik.values[key] = "";
          
        }
      });
    }
  }, [data]);
  const validationSchema = yup.object({
    city: yup.string().min(2).required(),
    area: yup.string().required(),
    street: yup.string().required(),
    // bulid: yup.object({
    //   name: yup.string().required(),
    //   number: yup.string().required()
    // }),
    floor: yup.string().required(),
    partment: yup.string().required(),
    mark: yup.string()
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      
      city: "",
      area: "",
      street: "",
      build: {
        name: "",
        number: ""
      },
      floor: "",
      partment: "",
      mark: ""
    },
    onSubmit: async (values) => {
      if (getAddress) {
        await axios
          .put("/add_address", { addressId: data, values: values })
          .then((res) => {
            decodeUserInfo()
            fun()
            enqueueSnackbar(`${res.data.message}`, { variant: "success" });
          })
          .catch((err) => {
            enqueueSnackbar(`${err.response.data.message}`, {
              variant: "error"
            });
            console.log(err);
          });
      } else {
        await axios
          .post("/add_address", values)
          .then((res) => {
            decodeUserInfo();
            fun();
            enqueueSnackbar(`${res.data.message}`, { variant: "success" });
          })
          .catch((err) => {
            enqueueSnackbar(`${err.response.data.message}`, {
              variant: "error"
            });
            console.log(err);
          });
      }
    }
  });
  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"} py={4}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} maxWidth={"md"}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              onChange={formik.handleChange}
              label={"City"}
              name="city"
              value={formik.values.city}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlined />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              onChange={formik.handleChange}
              label={"area"}
              name="area"
              value={formik.values.area}
              error={formik.touched.area && Boolean(formik.errors.area)}
              helperText={formik.touched.area && formik.errors.area}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Map />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              onChange={formik.handleChange}
              label={"street"}
              name="street"
              value={formik.values.street}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SignpostOutlined />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              onChange={formik.handleChange}
              label={"Build Name"}
              name="build.name"
              value={formik.values.build.name}
              error={
                formik.touched.build?.name && Boolean(formik.errors.build?.name)
              }
              helperText={
                formik.touched.build?.name && formik.errors.build?.name
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessOutlined />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              onChange={formik.handleChange}
              label={"Build Number"}
              name="build.number"
              required
              value={formik.values.build.number}
              error={
                formik.touched.build?.number &&
                Boolean(formik.errors.build?.number)
              }
              helperText={
                formik.touched.build?.number && formik.errors.build?.number
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EighteenUpRatingOutlined />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              onChange={formik.handleChange}
              label={"floor"}
              name="floor"
              value={formik.values.floor}
              error={formik.touched.floor && Boolean(formik.errors.floor)}
              helperText={formik.touched.floor && formik.errors.floor}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlined />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              onChange={formik.handleChange}
              label={"partment"}
              name="partment"
              value={formik.values.partment}
              error={formik.touched.partment && Boolean(formik.errors.partment)}
              helperText={formik.touched.partment && formik.errors.partment}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlined />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              onChange={formik.handleChange}
              label={"mark"}
              name="mark"
              value={formik.values.mark}
              error={formik.touched.mark && Boolean(formik.errors.mark)}
              helperText={formik.touched.mark && formik.errors.mark}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlined />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} mt={1} display={"flex"} justifyContent={"end"}>
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
