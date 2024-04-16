import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  Badge,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  TableBody,
  Box,
  Grid,
  Card
} from "@mui/material";
import { Delete, ShoppingCartOutlined } from "@mui/icons-material";
import { Store } from "@/context/dataStore";
import Quantity from "./Quantity";

export default function CartDetials() {
  const [open, setOpen] = useState(false);
  const { cartItems } = Store();
  const handlerOpen = () => {
    setOpen(true);
  };
  const handlerClose = () => {
    setOpen(false);
  };
  const list = ["Name", "quantity", "size", "price", "delete"];
  return (
    <>
      <Badge badgeContent={cartItems?.total_cart_quantity} color="success">
        <IconButton onClick={handlerOpen}>
          <ShoppingCartOutlined sx={{ color: "#f0c000" }} />
        </IconButton>
      </Badge>

      <Dialog open={open} fullScreen>
        <DialogTitle> Cart items </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box>
            <Typography>{cartItems.total_Cart_After_Discount}</Typography>
          </Box>
          <TableContainer>
            <Grid container spacing={1}>
              <Grid item md={9} xs={12}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {list.map((titel, index) => (
                        <TableCell key={index} align="center">
                          <Typography
                            variant="body1"
                            fontWeight={700}
                            textTransform={"capitalize"}
                          >
                            {titel}{" "}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems?.items?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          <Typography
                            variant="body1"
                            fontWeight={700}
                            textTransform={"capitalize"}
                          >
                            {item.productName}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Quantity data={item} />
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body1"
                            fontWeight={700}
                            textTransform={"capitalize"}
                          >
                            {item.size}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {item.offer_value ? (
                            <Box
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              gap={1}
                            >
                              <Typography className="price-remov">
                                {item.totalPrice}
                              </Typography>
                              <Typography>
                                {item.total_After_Discount} EP
                              </Typography>
                            </Box>
                          ) : (
                            <Typography
                              variant="body1"
                              fontWeight={700}
                              textTransform={"capitalize"}
                            >
                              {item.totalPrice} EP
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Button color="error">
                            <Delete />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
              <Grid item md={3} xs={12}>
               <Card>
sdvgsd
               </Card>
              </Grid>
            </Grid>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
