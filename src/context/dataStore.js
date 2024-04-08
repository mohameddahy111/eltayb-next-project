'use client'
import {createContext, useContext, useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {useMediaQuery} from "@mui/material";
import {useRouter} from "next/navigation";

const StoreData = createContext();
export const StoreDataProvider = ({children}) => {
  const router = useRouter();
  // const cookies = getCookies()
  const mobileDivices = useMediaQuery("(max-width: 600px)");
  const [admin, setAdmin] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [listOfFrindes, setListOfFrindes] = useState([])
  const decodeUserInfo = () => {
    if (getCookie("userInfo")) {
      setUserInfo(JSON.parse(getCookie("userInfo")))
    } else {
      setUserInfo(null)
    }
  }
  useEffect(() => {
    decodeUserInfo()
  }, []);
  useEffect(() => {
    if (userInfo) {
      if (userInfo?._isAdmin) {
        setAdmin(true)
        // router.push('/dashboard')
      } else {
        setAdmin(false)
        // router.push(`/users/${userInfo?._id}`)
      }
    }

  }, [userInfo])
  return (
   <StoreData.Provider
    value={{decodeUserInfo, userInfo, admin, setAdmin, setUserInfo, mobileDivices, listOfFrindes, setListOfFrindes}}>
     {children}
   </StoreData.Provider>
  )
}
export const Store = () => {
  return useContext(StoreData)
}