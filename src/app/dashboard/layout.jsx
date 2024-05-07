"use client";
import { Box, Button, ButtonGroup, Badge } from "@mui/material";
import { useEffect } from "react";
import ProductSearch from "@/components/dashboard/ProductSearch";
import Divider from "@mui/material/Divider";
import { Store } from "@/context/dataStore";
import { useRouter } from "next/navigation";
import { AddCategory } from "@/components/dashboard/category/AddCategory";
import { AddBrand } from "@/components/dashboard/brand/AddBrand";
import { useGetData } from "@/hooks/getData";

export default function Layout({ children }) {
  const { userInfo, setAdmin, mobileDivices } = Store();
  const { data } = useGetData(`orders/notification`);
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      setAdmin(false);
      // router.push('/')
    }
  }, [userInfo]);
  return (
    <Box py={4}>
      <Box
        pb={2}
        px={1}
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
        flexDirection={mobileDivices ? "column" : "row"}
        gap={3}
      >
        <Box></Box>
        {/*<ProductSearch/>*/}
        <ButtonGroup>
          <Button
            onClick={() => {
              router.push("/dashboard/all_products");
            }}
          >
            all product{" "}
          </Button>
          <Button
            onClick={() => {
              router.push("/dashboard/add_product");
            }}
          >
            add product{" "}
          </Button>
          <Badge badgeContent={data.number} overlap="circular" color="error">
            <Button
              onClick={() => {
                router.push("/dashboard/new_orders");
              }}
            >
              new Orders{" "}
            </Button>
          </Badge>
          <Button
            onClick={() => {
              router.push("/dashboard/all_orders");
            }}
          >
            all Orders{" "}
          </Button>

          <AddCategory />
          <AddBrand />
        </ButtonGroup>
      </Box>
      {/*<Divider/>*/}
      <Box py={2} component={"main"}>
        {children}
      </Box>
    </Box>
  );
}
