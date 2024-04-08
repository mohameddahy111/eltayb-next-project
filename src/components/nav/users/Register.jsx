"use client";
import React, {useState} from "react";
import {Box, Button, Dialog, DialogTitle, Grid, IconButton, TextField, Typography} from "@mui/material";
import * as yup from "yup"
import {useFormik} from "formik";
import {Close} from "@mui/icons-material";
import axios from "axios";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";

export default function Register() {
  const router = useRouter()
  const {enqueueSnackbar} = useSnackbar()
  const [open, setOpen] = useState(false);
  const validationSchema = yup.object({
    name: yup.string().min(2).required("Name is required"),
    mobile: yup.string().min(2).required("Mobile is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  const formik = useFormik({
    validationSchema, initialValues: {
      name: "", email: "", mobile: "", password: "", cPassword: ''
    }, onSubmit: async (values) => {
      await axios.post('/register', values).then((res) => {
        if (res.status === 201) {
          enqueueSnackbar(`${res.data.message}`, {variant: "success"})
          closeHandler()
          router.push('/login')
        }
      }).catch((err) => {
        enqueueSnackbar(`${err.response.data.message}`, {variant: "error"})
        console.log(err)
      })
    }
  })
  
  function openHandler() {
    setOpen(true)
    formik.handleReset()
  }
  
  function closeHandler() {
    formik.handleReset()
    setOpen(false)
  }
  
  return (<Box>
    
    <Button onClick={openHandler} variant="text">
      Register
    </Button>
    
    
    <Dialog open={open} fullWidth>
      <Box p={2}>
        <IconButton onClick={closeHandler}>
          <Close/>
        </IconButton>
      
      </Box>
      <DialogTitle textAlign='center' component='h1' variant='h3'>
        Register
      </DialogTitle>
      <Box p={2}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <TextField id="name" label="Name"
                         variant="outlined"
                         fullWidth name={"name"}
                         onChange={formik.handleChange}
                         value={formik.values.name}
                         error={formik.touched.name && Boolean(formik.errors.name)}
                         helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id="email" label="Email"
                         variant="outlined"
                         fullWidth name={"email"}
                         inputProps={{type: "email"}}
                         onChange={formik.handleChange}
                         value={formik.values.email}
                         error={formik.touched.email && Boolean(formik.errors.email)}
                         helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id="mobile" label="Mobile"
                         variant="outlined"
                         fullWidth name={"mobile"}
                         inputProps={{maxLength: 11}}
                         onChange={formik.handleChange}
                         value={formik.values.mobile}
                         error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                         helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id="password" label="Password"
                         variant="outlined"
                         fullWidth
                         name={"password"}
                         onChange={formik.handleChange}
                         inputProps={{type: "password"}}
                         value={formik.values.password}
                         error={formik.touched.password && Boolean(formik.errors.password)}
                         helperText={formik.touched.password && formik.errors.password}
              />
            
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField id="cPassword" label="confirm-Password"
                         variant="outlined"
                         fullWidth name={"cPassword"}
                         inputProps={{type: "password"}}
                         onChange={formik.handleChange}
                         value={formik.values.cPassword}
                         error={formik.touched.cPassword && Boolean(formik.errors.cPassword)}
                         helperText={formik.touched.cPassword && formik.errors.cPassword}
              />
            
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography textTransform="capitalize" component={'a'} color={'#09c'} href={"/login"}>
                i have an account
              </Typography>
            </Grid>
           
            <Grid item xs={12} md={12} mt={3}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      
      </Box>
    </Dialog>
  
  
  </Box>)
}
