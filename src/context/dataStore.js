"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

const StoreData = createContext();
export const StoreDataProvider = ({ children }) => {
  const router = useRouter();
  // const cookies = getCookies()
  const mobileDivices = useMediaQuery("(max-width: 600px)");
  const [admin, setAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [address, setAddress] = useState(null);
  const [listOfFrindes, setListOfFrindes] = useState([]);
  const [cartItems, setCartItems] = useState(true);
  const [shippingAddress, setShippingAddress] = useState("");
  const decodeUserInfo = () => {
    if (getCookie("userInfo")) {
      setUserInfo(JSON.parse(getCookie("userInfo")));
    } else {
      setUserInfo(null);
    }
    if (getCookie("cartItems")) {
      setCartItems(JSON.parse(getCookie("cartItems")));
    } else {
      setCartItems(null);
    }
    if (getCookie("address")) {
      setAddress(JSON.parse(getCookie("address")));
    } else {
      setAddress(null);
    }
    if (getCookie("shippingAddress")) {
      setShippingAddress(JSON.parse(getCookie("shippingAddress")));
    } else {
      setShippingAddress(null);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo._isAdmin) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [userInfo]);
  useEffect(() => {
    decodeUserInfo();
  }, []);
  return (
    <StoreData.Provider
      value={{
        decodeUserInfo,
        userInfo,
        admin,
        setAdmin,
        setUserInfo,
        mobileDivices,
        listOfFrindes,
        setListOfFrindes,
        cartItems,
        setCartItems,
        address,
        setAddress,
        shippingAddress,
        setShippingAddress
      }}
    >
      {children}
    </StoreData.Provider>
  );
};
export const Store = () => {
  return useContext(StoreData);
};
