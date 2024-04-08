import {Box, IconButton, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import {useState} from "react";
import axios from "axios";
import {Store} from "@/context/dataStore";

export const Search = () => {
  const {setListOfFrindes} = Store()
  const [searchWord, setSearchWord] = useState("");
  const getSearchList = async () => {
    await axios.post('/frindes/search', {searchWord})
     .then(res => {
       setListOfFrindes({message: null, list: res.data.list});
       console.log(res.data)
       setSearchWord('')
     }).catch((err) => {
       console.log(err)
     })
  }
 
  return (
   <Box pt={1.5} width={'100%'} display={"flex"} alignItems={"center"} justifyContent={"start"}>
     <TextField
      onChange={(e) => {
       setSearchWord(e.target.value)
     }}
      value={searchWord}
                variant={'standard'}
                placeholder={'find your frindes by email or mobile number'}
                sx={{width: '400px'}}/>
     <IconButton onClick={getSearchList}>
       <SearchOutlined/>
     </IconButton>
   
   </Box>
  )
}