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
  const { data, loading } = useGetData("products/");
  const router = useRouter()
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
                  <Typography variant="h6">Image</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    status
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    quintity
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" textTransform={"capitalize"}>
                    show
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6"> details</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((ele, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <img src={ele.image.scr} alt={ele.name} width={60} />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{ele.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <ChaanchStatus
                      data={{
                        status: ele.product_available,
                        id: ele._id,
                        item: "product_available"
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {ele.price.map((x) => (
                      <Typography color={x.quantity < 10 ? "red" : "green"}>
                        {x.size} , {x.quantity}{" "}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    <ChaanchStatus
                      data={{ status: ele.show, id: ele._id, item: "show" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        router.push(`/dashboard/all_products/${ele.slug}`);
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
