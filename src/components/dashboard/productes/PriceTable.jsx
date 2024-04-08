import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";

export const PriceTable = ({list, deletFun}) => {
  const tableHead = ['Size', 'Price', 'Offer', "Final Price","Quantity", 'Available', "Action"];
  return (
   <>
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             {tableHead.map(row => (
              <TableCell align={'center'} key={row}>{row} </TableCell>
             ))}
           
           </TableRow>
         </TableHead>
         <TableBody>
           {!list || list.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12}>
                <Typography textAlign={'center'} color={'gray'} textTransform={'capitalize'}> add some price for this
                  product</Typography>
              </TableCell>
            </TableRow>) : <>
             {list.map((row, i) => (
              <TableRow key={i}>
                <TableCell align={'center'} > {row.size} </TableCell>
                <TableCell align={'center'} > {row.value} EP </TableCell>
                <TableCell align={'center'} > {row.value_of_offer} % </TableCell>
                <TableCell align={'center'} > {row.final_price} EP </TableCell>
                <TableCell align={'center'} > {row.quantity} </TableCell>
                <TableCell align={'center'} > {row._isAvailable ? "Available" : " Not Available"} </TableCell>
                <TableCell align={'center'} > <IconButton onClick={() => {
                  deletFun(row.size)
                }}><Delete sx={{color: "red"}}/> </IconButton> </TableCell>
              </TableRow>
             ))}
           </>
           }
         </TableBody>
       </Table>
     </TableContainer>
   </>
  )
}