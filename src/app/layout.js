"use client";
// import {Exo_2} from "next/font/google";
import "./globals.css";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import axios from "axios";
import {SnackbarProvider} from "notistack";
import {StoreDataProvider} from "@/context/dataStore";
import NAvContainer from "@/components/nav/NAvContainer";

// const inter = Exo_2({subsets: ["latin", "cyrillic"]});

const theme = createTheme({
  typography: {
    color: "#000",
    h1: {
      fontSize: "2.5rem",
      textTransform: "capitalize",
      fontWeight: 800
    },
    h2: {
      fontSize: "2rem",
      textTransform: "capitalize",
      fontWeight: 800
    },
    h3: {
      fontSize: "1.8rem",
      textTransform: "capitalize",
      fontWeight: 700
    },
    h4: {
      fontSize: "1.6rem",
      textTransform: "capitalize",
      fontWeight: 700
    },
    h5: {
      fontSize: "1.4rem",
      textTransform: "capitalize",
      fontWeight: 600
    },
    h6: {
      fontSize: "1.1rem",
      textTransform: "capitalize",
      fontWeight: 600
    }
  },
  palette: {
    success: {
      main: "#33cf4d"
    }
  }
});
axios.defaults.baseURL = "http:eltayb-next-project-mohameddahy111s-projects.vercel.app/api/";
// axios.defaults.headers={ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*' }
export default function RootLayout({children}) {
  
 
  return (
   <html lang="en">
   
   <body >
   <StoreDataProvider>
     <SnackbarProvider anchorOrigin={{horizontal: "center", vertical: "top"}}>
       <ThemeProvider theme={theme}>
         <CssBaseline/>
         <NAvContainer/>
         {children}
       </ThemeProvider>
     </SnackbarProvider>
   </StoreDataProvider>
   </body>
   </html>
  );
}
