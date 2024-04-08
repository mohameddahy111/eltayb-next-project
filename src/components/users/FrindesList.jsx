import {Badge, Box, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import axios from "axios";
import {Fragment, useEffect} from "react";
import {Store} from "@/context/dataStore";
import Avatar from "@mui/material/Avatar";
import OptionsFrindsList from "@/components/users/OptionsFrindsList";

export const FrindesList = () => {
  const {listOfFrindes, setListOfFrindes} = Store()
  const list = async () => {
    await axios.get('/frindes').then((res) => {
      setListOfFrindes({message: res.data.message, list: res.data.list})
      console.log(res)
    }).catch((err) => {
      console.log(err)
    });
  }
  useEffect(() => {
    list()
  }, []);
  return (
   <>
     
     <List>
       {listOfFrindes?.list?.length === 0 ? <Box display={'flex'} flexDirection={'column'}
                                                 justifyContent={'center'}><Typography
         color={'gray'} textTransform={'capitalize'}>{listOfFrindes.message} </Typography>
        </Box> :
        <>
          {listOfFrindes?.list?.map(item => (
           <ListItem key={item._id} className={'box-flex-between'}>
             <Badge color="success" component="div" variant={item._isActive ? "dot" : null}>
               
               <ListItemAvatar>
                 <Avatar>
                   {item.name[0]}
                 </Avatar>
               </ListItemAvatar>
               <ListItemText>
                 {item.name}
               </ListItemText>
             </Badge>
             <OptionsFrindsList item={item}/>
           
           </ListItem>
          ))}
        </>
       }
     
     </List>
   </>
  )
}