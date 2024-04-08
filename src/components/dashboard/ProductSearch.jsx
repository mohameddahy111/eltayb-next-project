import {Fragment} from "react";
import {Box, FormControl, IconButton, InputLabel, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {SearchOutlined} from "@mui/icons-material";

export default function ProductSearch(props) {
  return (
   <Box display="flex" justifyContent={'ceter' } alignItems={'center'} gap={2}>
     <FormControl sx={{width :150}} size='small'>
       <InputLabel id="demo-simple-select-label">
         Select a type
       </InputLabel>
       <Select
        variant={'standard'}
        labelId="demo-simple-select-label"
        id="demo-simple-select"

        label=" Select a type"
        // onChange={handleChange}
       >
         <MenuItem value={10}>Prodect</MenuItem>
         <MenuItem value={20}>Category </MenuItem>
         <MenuItem value={30}> Brand </MenuItem>
       </Select>
       
     </FormControl>
     <Box className={'box-flex-center'}>
       <TextField variant={'standard'} size='small' label={'Search Products'}  />
       <IconButton>
         <SearchOutlined/>
       </IconButton>
     </Box>
   
   </Box>
  )
}