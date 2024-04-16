"use client";
import { useGetData } from "@/hooks/getData";
import React from "react";
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
  const { userId } = params;
  const { data } = useGetData(`orders/place_order`);
  const { userInfo } = Store();
  const router = useRouter();

  if (!userInfo) {
    return (
      <Box>
        <Typography>must login first to get your orders</Typography>
      </Box>
    );
  }
  return (
    <Box my={4}>
      <Typography
        pt={4}
        textAlign={"center"}
        variant="h4"
        component={"h1"}
        textTransform={"capitalize"}
        fontStyle={"italic"}
      >
        {userInfo.name}'s
        {"  "}
        <Typography
          component={"span"}
          textTransform={"capitalize"}
          fontStyle={"italic"}
          color={"#f0c000"}
          variant="h4"
        >
          orders{" "}
        </Typography>
      </Typography>
      <Container>
        <Box py={4}>
          <Grid container spacing={1}>
            <Grid item md={3} xs={12}>
              <Typography textAlign={"center"} variant="h6">
                total spend
              </Typography>
              <Typography textAlign={"center"} color={"grey"}>
                {data.total} EP
              </Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography textAlign={"center"} variant="h6">
                total Orders
              </Typography>
              <Typography textAlign={"center"} color={"grey"}>
                {data.allOrders} Order
              </Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography textAlign={"center"} variant="h6">
                last order at
              </Typography>
              <Typography textAlign={"center"} color={"grey"}>
                {data.orders?.map((x, index) => {
                  if (index === 0) {
                    return <Typography>{x.createdAt}</Typography>;
                  }
                })}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <TableContainer>
          <Typography
            variant="body2"
            color={"error"}
            textTransform={"capitalize"}
          >
            {" "}
            * note : Only the last 10 orders will be displayed{" "}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Order ID</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    {" "}
                    total{" "}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    {" "}
                    staut order
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    items number
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    order Date
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Order details</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.orders?.map((ele, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{ele._id}</TableCell>
                  <TableCell align="center">{ele.payment_total} EP</TableCell>
                  <TableCell align="center">{ele.staut_order}</TableCell>
                  <TableCell align="center">
                    {ele.items?.length} items
                  </TableCell>
                  <TableCell align="center">
                    {ele.createdAt}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        router.push(`/users/${userId}/orders/${ele._id}`);
                      }}
                    >
                      details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
