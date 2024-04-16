import { AppBar, Box, Button, Toolbar, Typography, Badge } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import styles from "@/app/sass/nave.module.scss";
import TopList from "./TopList";
import Register from "./users/Register";
import { useRouter } from "next/navigation";
import { Store } from "@/context/dataStore";
import UserMenu from "@/components/nav/users/UserMenu";
import { MobileMenu } from "@/components/nav/mobile/MobileMenu";
import { DashNav } from "@/components/dashboard/DashNav";
import { ShoppingCartOutlined } from "@mui/icons-material";
import CartDetials from "../home/CartDetials";

export default function NAvContainer() {
  const route = useRouter();
  const { userInfo, mobileDivices, admin, setAdmin, cartItems } = Store();
  return (
    <nav>
      {admin ? (
        <DashNav />
      ) : (
        <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
          <Toolbar>
            <Box className="box-flex-between">
              <Box className="box-flex-center">
                <Typography
                  component={"a"}
                  href="/"
                  className={styles.title}
                  variant="h4"
                >
                  chat app
                </Typography>
              </Box>
              <Box hidden={!mobileDivices}>
                <MobileMenu />{" "}
              </Box>
              <Box hidden={mobileDivices}>
                <TopList />
              </Box>
              <Box hidden={mobileDivices}>
                {!userInfo ? (
                  <Box className="box-flex-center" hidden={mobileDivices}>
                    <Register />
                    <Typography color={"#203040"}>/</Typography>
                    <Button
                      variant={"text"}
                      onClick={() => route.push("/login")}
                    >
                      Login{" "}
                    </Button>
                  </Box>
                ) : (
                  <Box
                    hidden={mobileDivices}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {cartItems ? (
                      <CartDetials/>
                    ) : null}

                    <UserMenu />
                  </Box>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </nav>
  );
}
