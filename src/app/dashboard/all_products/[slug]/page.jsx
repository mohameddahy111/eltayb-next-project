"use client";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import { iceList, sizeList } from "@/data/data";
import { PriceTable } from "@/components/dashboard/productes/PriceTable";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useGetData } from "@/hooks/getData";

export default function Page({ params }) {
  const { slug } = params;
  const { data, loading, setData } = useGetData(`products/${slug}`);
  const [choseList, setChoseList] = useState(sizeList);
  const { enqueueSnackbar } = useSnackbar();
  const [addImage, setAddImage] = useState("");
  const [urlImg, setUrlImg] = useState();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const formData = new FormData();
  // product - price -list //
  const [price, setPrice] = useState({
    value: 0,
    size: "Small",
    offer: false,
    value_of_offer: 0,
    final_price: 0,
    quantity: 0,
    _isAvailable: true
  });
  const [priceList, setPriceList] = useState([]);

  function chengePriceList(e) {
    if (e.target.name === "offer") {
      price["offer"] = !price.offer;
      setPrice({ ...price });
      console.log(price);
      return;
    }
    if (e.target.name === "value_of_offer" || e.target.name === "value") {
      price[e.target.name] = +e.target.value;
      price.final_price =
        price.value - (price.value * price.value_of_offer) / 100;
      setPrice({ ...price });
      console.log(price);
      return;
    }
    price[e.target.name] = e.target.value;
    console.log(price);
    setPrice({ ...price });
  }

  function addPrice() {
    const list = [...priceList];
    const isExist = list.find((x) => x.size === price.size);
    if (isExist) {
      enqueueSnackbar(`${price.size} is Exist in your list`, {
        variant: "error"
      });
      return;
    }
    if (price.value === 0) {
      enqueueSnackbar(`price is required`, { variant: "error" });
      return;
    }
    list.push(price);
    setPriceList(list);
    setPrice({
      value: 0,
      size: "Small",
      offer: false,
      value_of_offer: 0,
      final_price: 0,
      quantity: 0,
      _isAvailable: true
    });
  }

  function deletePrice(size) {
    const list = priceList.filter((x) => x.size !== size);
    setPriceList(list);
  }
  const correctData = () => {
    setUrlImg(data?.product?.image?.scr);
    setPriceList(data?.product?.price);
    formik.values.id = data?.product?._id;
    formik.values.category = data?.product?.category._id;
    formik.values.name = data?.product?.name;
    formik.values.show = data?.product?.show;
    formik.values.description = data?.product?.description;
    formik.values.brand = data?.product?.brand._id;
  };

  //end//
  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    brand: yup.string().required(),
    category: yup.string().required()
  });
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      _isAvailable: true,
      brand: "",
      category: "",
      show: false
    },
    validationSchema,
    onSubmit: async (values) => {
      priceList.map((ele, i) => {
        formData.append(`price.${i}.price`, ele.value);
        formData.append(`price.${i}.size`, ele.size);
        formData.append(`price.${i}.offer`, ele.offer);
        formData.append(`price.${i}.value_of_offer`, ele.value_of_offer);
        formData.append(`price.${i}.final_price`, ele.final_price);
        formData.append(`price.${i}.quantity`, ele.quantity);
        formData.append(`price.${i}._isAvailable`, ele._isAvailable);
      });
      const newProduct = {
        id: formik.values.id,
        name: values.name,
        description: values.description,
        brand: values.brand,
        category: values.category,
        show: values.show,
        price: priceList,
        image: addImage ? { name: addImage.name, type: addImage.type } : urlImg
      };
      // Object.keys(newProduct).map((ele , i )=>{
      //   formData.append(ele , newProduct[ele])
      // })
      await axios
        .put("products/add_product", newProduct)
        .then((res) => {
          if (res.status === 200) {
            enqueueSnackbar(`${res.data.message}`, { variant: "success" });
            // formik.handleReset();
            // setUrlImg("");
            // setPriceList([]);
            // setData(res.data);

            useGetData(`products/${res.data.product.slug}`);
          }
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(`${err.response.data.message}`, { variant: "error" });
        });
    }
  });

  function getImg(e) {
    setUrlImg("");

    setAddImage(e.target.files[0]);
  }

  async function getCategories() {
    await axios
      .get("category/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getBrand() {
    await axios
      .get("brand/")
      .then((res) => {
        setBrands(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCategories();
    getBrand();
  }, []);
  useEffect(() => {
    if (formik.values.category === "66088481757803beacf3c864") {
      setChoseList(iceList);
    } else {
      setChoseList(sizeList);
    }
  }, [formik.values.category]);
  useEffect(() => {
    if (data) {
      correctData();
    }
  }, [data]);
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12} position={"relative"}>
            <Box p={2} width={"100%"} sx={{ border: "2px dashed #09c" }}>
              <Box hidden={!addImage && !urlImg}>
                <img
                  src={addImage ? URL.createObjectURL(addImage) : urlImg}
                  alt={"img"}
                  width={"100%"}
                  height={"100%"}
                />
              </Box>
              <Box className={"box-flex-center"}>
                <IconButton>
                  <label htmlFor={"addImg"}>
                    <Add />{" "}
                  </label>
                </IconButton>
                <input
                  id="addImg"
                  name="addImg"
                  type="file"
                  hidden
                  onChange={(e) => getImg(e)}
                />
                <Typography px={2}>or</Typography>
                <TextField
                  value={urlImg}
                  label={"add Url"}
                  id={"urlImg"}
                  onChange={(e) => {
                    setAddImage("");
                    setUrlImg(e.target.value);
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container spacing={1}>
              <Grid item md={4} xs={12}>
                <TextField
                  name={"name"}
                  label={"Name"}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  select
                  name={"category"}
                  label={"Category"}
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  helperText={formik.touched.category && formik.errors.category}
                >
                  {categories.map((category) => (
                    <MenuItem value={category._id} key={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  select
                  name={"brand"}
                  label={"Brand"}
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.brand && Boolean(formik.errors.brand)}
                  helperText={formik.touched.brand && formik.errors.brand}
                >
                  {brands.map((brand) => (
                    <MenuItem value={brand._id} key={brand._id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={12} xs={12}>
                <Paper elevation={0} sx={{ padding: "10px" }}>
                  <Typography
                    component={"h6"}
                    variant={"h6"}
                    textTransform={"capitalize"}
                    py={3}
                  >
                    add price
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        select
                        name={"size"}
                        label={"size"}
                        value={price.size}
                        onChange={(e) => chengePriceList(e)}
                        fullWidth
                      >
                        {choseList.map((size, index) => (
                          <MenuItem value={size} key={index}>
                            {size}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        select
                        name={"_isAvailable"}
                        label={"Available"}
                        value={price._isAvailable}
                        onChange={(e) => chengePriceList(e)}
                        fullWidth
                      >
                        <MenuItem value={true}>Available</MenuItem>
                        <MenuItem value={false}>not Available</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        label="Price"
                        value={price.value}
                        name="value"
                        onChange={(e) => chengePriceList(e)}
                        id="outlined-start-adornment"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">EP</InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        label="Quantity"
                        value={price.quantity}
                        name="quantity"
                        onChange={(e) => chengePriceList(e)}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {price.size.includes("Liter")
                                ? "Bottle"
                                : price.size.includes("Kg")
                                ? "Kg"
                                : "Caps"}{" "}
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                      display={"flex"}
                      justifyContent={"space-around"}
                      alignItems={"center"}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            name={"offer"}
                            checked={price.offer}
                            value={price.offer}
                            onChange={(e) => chengePriceList(e)}
                          />
                        }
                        label={"Offer"}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            name={"show"}
                            defaultValue={formik.values.show}
                            value={formik.values.show}
                            checked={formik.values.show}
                            onChange={formik.handleChange}
                          />
                        }
                        label={"Show"}
                      />
                    </Grid>
                    {/*//offer detils // */}
                    <Grid item md={12} xs={12} hidden={!price.offer}>
                      <TextField
                        label="Offer Value"
                        value={price.value_of_offer}
                        name="value_of_offer"
                        onChange={(e) => chengePriceList(e)}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    {/*end*/}
                    <Grid item md={12} xs={12}>
                      <TextField
                        label="Final Price"
                        value={
                          price.offer
                            ? price.value -
                              (price.value * price.value_of_offer) / 100
                            : price.value
                        }
                        name="final_price"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">EP</InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={12} xs={12} py={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addPrice}
                    >
                      add price
                    </Button>
                  </Grid>
                </Paper>
                <Grid item md={12} xs={12}>
                  <PriceTable list={priceList} deletFun={deletePrice} />
                </Grid>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  name={"description"}
                  multiline
                  minRows={8}
                  label={"Description"}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Box py={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Edit Product
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
