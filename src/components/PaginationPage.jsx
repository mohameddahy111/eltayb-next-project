import { useGetData } from "@/hooks/getData";
import {
  KeyboardDoubleArrowLeftOutlined,
  KeyboardDoubleArrowRightOutlined,
  RedoOutlined,
  UndoOutlined
} from "@mui/icons-material";
import { Box, Icon, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

export default function PaginationPage({ data  , fun}) {

  const getPagination = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        fun(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    >
      <Box>
        <IconButton onClick={() => getPagination(`orders?page=${data?.pages}`)}>
          <KeyboardDoubleArrowLeftOutlined />
        </IconButton>
        <IconButton
          disabled={data?.nextUrl ? false : true}
          onClick={() => getPagination(`${data?.nextUrl}`)}
        >
          <UndoOutlined />
        </IconButton>
      </Box>
      <Typography>
        {data?.page} / {data?.pages}{" "}
      </Typography>
      <Box>
        <IconButton
          disabled={data?.preUrl ? false : true}
          onClick={() => getPagination(`${data?.preUrl}`)}
        >
          <RedoOutlined />
        </IconButton>
        <IconButton onClick={() => getPagination(`orders?page=1`)}>
          <KeyboardDoubleArrowRightOutlined />
        </IconButton>
      </Box>
    </Box>
  );
}
