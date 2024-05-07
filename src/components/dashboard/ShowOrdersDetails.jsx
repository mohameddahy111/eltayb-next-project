import {
  Close,
  VisibilityOffOutlined,
  VisibilityOutlined
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

export default function ShowOrdersDetails({ data }) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const openHandles = () => {
    setOpen(true);
  };
  const cloesHandles = () => {
    setOpen(false);
  };
  async function acceptOrder() {
    closeSnackbar();
    await axios
      .put(`/orders/place_order/${data._id}`, { item: "seen", value: true })
      .then((res) => {
        console.log(res);
        enqueueSnackbar(`${res.data.message}`, { variant: "success" });
        window.location.reload();
      })
      .catch((err) => {
         enqueueSnackbar(`${err.response.data.message}`, { variant: "error" });
        console.log(err);
      });
  }
  return (
    <Box>
      <IconButton onClick={openHandles}>
        {data?.seen ? (
          <VisibilityOutlined />
        ) : (
          <VisibilityOffOutlined sx={{ color: "#f0c000" }} />
        )}
      </IconButton>
      <Dialog open={open} fullWidth onClose={cloesHandles}>
        <Box display={"flex"} justifyContent={"end"} p={2}>
          <IconButton onClick={cloesHandles}>
            <Close />
          </IconButton>
        </Box>
        <DialogTitle align="center" variant="h6" textTransform={"capitalize"}>
          details order ID #
          <Typography component={"span"} variant="h6" color={"#09c"}>
            {" "}
            {data._id}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container>
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>Name : </Typography>
                  {data?.userId.name}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>Email : </Typography>
                  {data?.userId.email}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>
                    Mobile :{" "}
                  </Typography>
                  {data?.userId.mobile}
                </Typography>
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography
                  textTransform={"capitalize"}
                  color={"#09c"}
                  variant="h6"
                >
                  shipping info :-{" "}
                </Typography>
                <Divider />
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>city : </Typography>
                  {data?.shipping_Details.city}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>area : </Typography>
                  {data?.shipping_Details.area}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>
                    street :{" "}
                  </Typography>
                  {data?.shipping_Details.street}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>
                    build name :{" "}
                  </Typography>
                  {data?.shipping_Details.build.name}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>
                    build number :{" "}
                  </Typography>
                  {data?.shipping_Details.build.number}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>floor : </Typography>
                  {data?.shipping_Details.floor}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>
                    partment :{" "}
                  </Typography>
                  {data?.shipping_Details.partment}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>mark : </Typography>
                  {data?.shipping_Details.mark}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  pt={2}
                  color={"#09c"}
                  textTransform={"capitalize"}
                  variant="h6"
                >
                  Items info :-
                </Typography>
                <Divider />
              </Grid>
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
                        <TableCell align="center">Notes </TableCell>
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
                          <TableCell align="center">{item.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  pt={2}
                  color={"#09c"}
                  textTransform={"capitalize"}
                  variant="h6"
                >
                  accapt order by :-
                </Typography>
                <Divider />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
                display={data?.seen ? "inline-block" : "none"}
              >
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>Name : </Typography>
                  {data?.seenBy?.name}
                </Typography>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                display={data?.seen ? "inline-block" : "none"}
              >
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>email : </Typography>
                  {data?.seenBy?.email}
                </Typography>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                display={data?.seen ? "inline-block" : "none"}
              >
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>
                    mobile :{" "}
                  </Typography>
                  {data?.seenBy?.mobile}
                </Typography>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                display={data?.seen ? "inline-block" : "none"}
              >
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  fontWeight={800}
                >
                  <Typography textTransform={"capitalize"}>
                    seen At :{" "}
                  </Typography>
                  {new Date(data?.seenAt).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button disabled={data?.seen} onClick={acceptOrder}>
            Accept
          </Button>
          <Button onClick={cloesHandles}>close </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
