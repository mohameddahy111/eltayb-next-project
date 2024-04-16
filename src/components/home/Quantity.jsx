import React, { useEffect, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Store } from "@/context/dataStore";

export default function Quantity({ data }) {
  const { enqueueSnackbar } = useSnackbar();
  const {decodeUserInfo} = Store()
  const [value, setValue] = useState(data?.quantity);
  const setNewQuantity = (val) => {
    if (val === "add") {
      setValue(+value + 1);
    } else {
      setValue(value <= 1 ? 1 : +value - 1);
    }
  };

  const putQuantity = async () => {
    let item = {
      itemId: data._id,
      quantity: value
    };
    await axios
      .put("/add_to_cart", item)
      .then((res) => {
        console.log(res);
        decodeUserInfo()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (value !== data.quantity) {
      putQuantity();
    }
  }, [value]);

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <IconButton
        onClick={() => {
          setNewQuantity("");
        }}
        color="error"
      >
        <Remove />
      </IconButton>

      <TextField
        size="small"
        sx={{ width: "50px" }}
        variant="standard"
        inputProps={{ style: { textAlign: "center" } }}
        value={value}
      />
      <IconButton
        color="success"
        onClick={() => {
          setNewQuantity("add");
        }}
      >
        <Add />
      </IconButton>
    </Box>
  );
}
