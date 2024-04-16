import React, { useState } from "react";
import { Switch } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
export default function ChaanchStatus({ data }) {
  const [status, setStatus] = useState(data.status);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const chengeStatus = async () => {
    closeSnackbar();
    setStatus(!status);
    await axios
      .put("products", {
        id: data.id,
        value: !data.status,
        item: data.item
      })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(`${res.data.message}`, { variant: "success" });
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${res.respons.data.message}`, {
          variant: "error"
        });

        console.log(err);
      });
  };
  return (
    <div>
      <Switch
        onChange={() => {
          chengeStatus();
        }}
        color={"success" }
        defaultChecked={status}
      />
    </div>
  );
}
