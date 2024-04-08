import {topList} from "@/data/data";
import {Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useRouter} from "next/navigation";
import React from "react";


export default function TopList() {
  const router = useRouter();
  return (
    <Box>
      <List className="box-flex-center">
        {topList.map((ele, index) => (
         
          <ListItemButton
            onClick={()=>router.push(ele.path)}
            key={index}
            sx={{textTransform: "capitalize" , color :"#203040"}}
          >
            {" "}
            {ele.title}{" "}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
