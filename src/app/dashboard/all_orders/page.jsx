"use client";

import { useGetData } from "@/hooks/getData";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  Table,
  Typography,

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
  Switch,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TableFooter,
  TablePagination
} from "@mui/material";
import ChaanchStatus from "@/components/dashboard/productes/ChaanchStatus";
import { useRouter } from "next/navigation";
import { FormControl } from "@mui/base";
import PaginationPage from "@/components/PaginationPage";
import axios from "axios";
import ShowOrdersDetails from "@/components/dashboard/ShowOrdersDetails";

export default function Page() {
  const { data, loading } = useGetData("orders?page=1");
  const [orders, setOrders] = useState([]);
  const [filterList, setFilterList] = useState(null);
  const [showPagination, setShowPagination] = useState(false);
  const router = useRouter();
  const filterOrders = async (val) => {
    await axios
      .get(`orders/`)
      .then((res) => {
        if (val === "none") {
          setFilterList(null);
          setShowPagination(false);
        }
        if (val === "day") {
          const list = res.data?.orders?.filter(
            (ele) => new Date().getDay() === new Date(ele.createdAt).getDay()
          );
          setFilterList(list);
        }
        if (val === "last") {
          const list = res.data?.orders?.filter(
            (ele) =>
              new Date().getDay() - 1 === new Date(ele.createdAt).getDay()
          );
          setFilterList(list);
        }
        if (val === "week") {
          const list = res.data?.orders?.filter(
            (ele) => new Date().getDay() - 7 < new Date(ele.createdAt).getDay()
          );
          setShowPagination(true);
          setFilterList(list);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);
  return (
    <Box>
      <Container>
        <Box py={2}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              <Typography textTransform={"capitalize"} py={2}>
                Sort orders by date
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={"none"}
              onChange={(e) => filterOrders(e.target.value)}
            >
              <FormControlLabel
                value={"none"}
                control={<Radio />}
                label="All Orders"
              />
              <FormControlLabel
                value={"day"}
                control={<Radio />}
                label="To Day"
              />
              <FormControlLabel
                value={"last"}
                control={<Radio />}
                label="Last Day"
              />
              <FormControlLabel
                value={"week"}
                control={<Radio />}
                label="Last Week"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <TableContainer>
          <Typography
            variant="body2"
            color={"error"}
            textTransform={"capitalize"}
          >
            {" "}
          </Typography>
          {filterList?.length === 0 ? (
            <Box py={10}>
              <Typography
                textTransform={"capitalize"}
                textAlign={"center"}
                variant="h5"
              >
                sorry not find any order
              </Typography>
            </Box>
          ) : (
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
                {(filterList || orders?.orders)?.map((ele, index) => (
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
                      <Typography variant="">{ele.staut_order}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <ShowOrdersDetails data={ele} />
                    </TableCell>
                    <TableCell align="center">{ele.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <Box py={2} display={showPagination ? "none" : "block"}>
            <PaginationPage data={orders?.pagination} fun={setOrders} />
          </Box>
        </TableContainer>
      </Container>
    </Box>
  );
}
