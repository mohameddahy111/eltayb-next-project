"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { Store } from "@/context/dataStore";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Register from "@/components/nav/users/Register";

export default function Page() {
  const router = useRouter();
  const { decodeUserInfo, mobileDivices, userInfo, admin } = Store();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object({
    email: yup.string().required("Mobile is required or email is required"),
    password: yup.string().required("Password is required")
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      setLoading(true);
      await axios
        .post("/login", values)
        .then((res) => {
          enqueueSnackbar(`${res.data.message}`, { variant: "success" });
          decodeUserInfo();
          setLoading(false);
          router.push("/shop");
        })
        .catch((err) => {
          setLoading(false);
          enqueueSnackbar(`${err.response.data.message}`, { variant: "error" });
          console.log(err);
        });
    }
  });
  useEffect(() => {
    if (admin) {
      router.push("/dashboard");
    }
  }, [admin]);
  useEffect(() => {
    if (getCookie("userInfo")) {
      closeSnackbar();
      router.push(`/users/${userInfo?._id}`);
      enqueueSnackbar("you are logged in", { variant: "info" });
    }
  }, []);
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"90vh"}
    >
      <Card sx={{ width: mobileDivices ? "98%" : "60%", p: 3 }}>
        <Typography p={3} textAlign="center" component={"h2"} variant="h3">
          Login
        </Typography>
        <form
          style={{ width: "90%", margin: "auto" }}
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <TextField
                id="email"
                label="  Email or Mobile"
                variant="outlined"
                fullWidth
                name={"email"}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                placeholder={"Enter Your Email Or Mobile Number"}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                name={"password"}
                onChange={formik.handleChange}
                inputProps={{ type: "password" }}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Box
              pt={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Grid item md={6} display={"flex"} alignItems={"center"}>
                <Typography textTransform="capitalize">
                  i don't have an account /
                </Typography>
                <Register />
              </Grid>
              <Grid item md={6} display={"flex"} justifyContent={"end"}>
                <Typography
                  textTransform="capitalize"
                  component={"a"}
                  color={"#09c"}
                  href={"/forgot-password"}
                >
                  forget password?
                </Typography>
              </Grid>
            </Box>
            <Grid item xs={12} md={12} display="flex" justifyContent={"end"}>
              <LoadingButton loading={loading} type={"submit"} variant="text">
                Login
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
}
