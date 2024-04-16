"use client"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid, IconButton,
  TextField, Typography,

} from "@mui/material";
import { Close, ShoppingCartOutlined } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import * as yup from 'yup'
import { useFormik } from "formik";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Store } from "@/context/dataStore";

export const AddToCartDialog = ({ data }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const {decodeUserInfo} =Store()
  const [open, setOpen] = useState(false);
  const validationSchema = yup.object({
    size: yup.string().required('Size is required'),
    quantity: yup.number().moreThan(0).required('Quantity is required'),
  })
  const formik = useFormik({
    validationSchema,
    initialValues: {
      productName: '',
      productId: '',
      size: 'Small',
      quantity: 1,
      notes: ""
    },
    onSubmit: async (values) => {

      await axios.post(`/add_to_cart`, values).then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Successfully added to cart!", { variant: "success" });
          decodeUserInfo()
          formik.handleReset()
          handleClose();

        }
      }).catch((err) => {
        console.log(err)
        enqueueSnackbar(`${err.response.data.message}`, { variant: "error" });
      })
    }
  })
  const handleClose = () => {
    formik.handleReset()
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }
  useEffect(() => {
    if (data) {
      formik.values.productId = data._id
      formik.values.productName = data.name
    }
  }, [data]);
  return (
    <Fragment>
      <Button
        disabled={!data.product_available}
        onClick={handleOpen}
        startIcon={<ShoppingCartOutlined />}
        fullWidth
        variant={"contained"}
        sx={{ bgcolor: "#f0c000", ":hover": { bgcolor: "#09c" } }}
      >
        Add to cart
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          Add To Cart
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  name={"size"}
                  select
                  label={"Chosee Size"}
                  fullWidth
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  error={formik.touched.size && Boolean(formik.errors.size)}
                  helperText={formik.touched.size && formik.errors.size}
                >
                  {data?.price?.map((ele, index) => (
                    <MenuItem key={index} value={ele.size}>
                      <Box
                        width={"100%"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyItems={"space-between"}
                      >
                        <Typography width={"100%"}>{ele.size}</Typography>
                        {ele.offer ? (
                          <Typography component={"span"} color={"green"}>
                            save {ele.value_of_offer}%
                          </Typography>
                        ) : null}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name={"quantity"}
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.quantity && Boolean(formik.errors.quantity)
                  }
                  helperText={formik.touched.quantity && formik.errors.quantity}
                  inputProps={{ type: "number", min: 1 }}
                  label={"Quantity"}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  variant={"standard"}
                  label={"Notes"}
                  fullWidth
                  name={"notes"}
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color={"error"}>
              Cancel
            </Button>
            <Button
              type={"submit"}
              color={"success"}
              endIcon={<ShoppingCartOutlined />}
            >
              {" "}
              Add To Cart{" "}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}
