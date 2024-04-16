"use client"

import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Edit, Groups2Outlined, Settings} from "@mui/icons-material";
import {FrindesList} from "@/components/users/FrindesList";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
   <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
   >
     {value === index && (
      <Box sx={{ p: 3 }}>
       {children}
      </Box>
     )}
   </div>
  );
}



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UsersTabs() {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={
              <img
                src="../management-team.gif"
                alt="management-team"
                width={40}
              />
            }
            {...a11yProps(0)}
          />
          <Tab
            icon={
              <img
                src="../order-history.gif"
                alt="management-team"
                width={40}
              />
            }
            {...a11yProps(1)}
          />
          <Tab icon={<Edit />} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <FrindesList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
