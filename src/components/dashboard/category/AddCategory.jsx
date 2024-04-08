"use client"
import {Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography} from "@mui/material";
import {useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import {Add, Close} from "@mui/icons-material";
import * as yup from 'yup'
import {useFormik} from "formik";
import axios from "axios";
import {useSnackbar} from "notistack";

export const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const {enqueueSnackbar} = useSnackbar()
  const [addImage, setAddImage] = useState('');
  const [urlImg, setUrlImg] = useState('');
  const openAddCategory = () => {
    setOpen(true);
  }
  const closeAddCategory = () => {
    setOpen(false);
  }
  const validationSchema = yup.object({
    name: yup.string().required(),
  })
  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: '',
    },
    onSubmit: async (valuse) => {
      const newCategory = {
        name: valuse.name,
        image: urlImg,
      }
      await axios.post('category/categoryCrud', newCategory).then((res) => {
        console.log(res)
        if (res.status === 200) {
        enqueueSnackbar(`success add category` , {variant:"success"} )
          setUrlImg('')
          formik.handleReset()
          closeAddCategory()
        }
      }).catch(err => {
        console.log(err)
        enqueueSnackbar(`${err.response.data.message}`, {variant:"error"})
      })
    }
  })
  
  function getImg(e) {
    setUrlImg('');
    const image = URL.createObjectURL(e.target.files[0]);
    setAddImage(image);
  }
  
  return (
   <>
     <Button variant={'outlined'} onClick={openAddCategory}>
       Add Category
     </Button>
     <Dialog open={open} fullWidth onClose={closeAddCategory}>
       <Box display="flex" justifyContent="end" p={2}>
         <Tooltip title={'close'}>
           <IconButton onClick={closeAddCategory}>
             <Close/>
           </IconButton>
         </Tooltip>
       </Box>
       <DialogTitle textAlign="center">
         Add Category
       </DialogTitle>
       <DialogContent>
         <form onSubmit={formik.handleSubmit}>
           <Grid container spacing={1} py={2}>
             {/*image side*/}
             <Grid item xs={12} md={6}>
               <Box p={2} width={'100%'} sx={{border: '2px dashed #09c'}}>
                 <Box hidden={!addImage && !urlImg}>
                   <img src={addImage || urlImg} alt={'img'} width={'100%'} height={'100%'}/>
                 </Box>
                 <Box className={'box-flex-center'}>
                   <IconButton>
                     <label htmlFor={'addcategoryImg'}><Add/> </label>
                   </IconButton>
                   <input id="addcategoryImg" name='addImg' type="file" hidden onChange={(e) => getImg(e)}/>
                   <Typography px={2}>
                     or
                   </Typography>
                   <TextField value={urlImg} label={'add Url'} id={'urlImg'} onChange={(e) => {
                     setAddImage('');
                     setUrlImg(e.target.value)
                   }}/>
                 
                 </Box>
               
               </Box>
             </Grid>
             {/*form side*/}
             <Grid item xs={12} md={6}>
               <Grid item md={12} xs={12}>
                 <TextField
                  name={'name'}
                  label={'Name'}
                  onChange={formik.handleChange}
                  fullWidth
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                 />
               </Grid>
               <Grid item md={12} xs={12}>
                 <Box py={2}>
                   
                   <Button fullWidth variant="contained" color="secondary" type="submit">
                     add Product
                   </Button>
                 </Box>

               </Grid>
             </Grid>
           </Grid>
         </form>
       </DialogContent>
     
     </Dialog>
   </>
  )
}