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
  Button,
  Switch
} from "@mui/material";
import ChaanchStatus from "@/components/dashboard/productes/ChaanchStatus";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data, loading } = useGetData("orders/notification");
  console.log(data);
  const router = useRouter();
  return (
    <Box>
      <Container>
        <TableContainer>
          <Typography
            variant="body2"
            color={"error"}
            textTransform={"capitalize"}
          >
            {" "}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">ID</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    user name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    total
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    status
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    show
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    time & date
                  </Typography>
                </TableCell>
                {/* <TableCell align="center">
                  <Typography variant="h6"> details</Typography>
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.newOrders?.map((ele, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{ele._id}</TableCell>
                  <TableCell align="center">
                    <Typography textTransform={"capitalize"}>
                      {ele.userId.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="">{ele.total_price} EP</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="">{ele.total_price} EP</Typography>
                  </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">{ele.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
