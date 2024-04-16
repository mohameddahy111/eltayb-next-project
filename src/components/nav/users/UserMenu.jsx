import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Store } from "@/context/dataStore";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { Dashboard } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Image from 'next/image'

export default function UserMenu() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { userInfo, decodeUserInfo } = Store();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = async () => {
    await axios
      .get("/login")
      .then((res) => {
        enqueueSnackbar(`${res.data.message}`, { variant: "success" });
        decodeUserInfo();
        router.push("/");
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data.message}`, { variant: "error" });
        console.log(err);
      });
  };
  const getProfile = () => {
    router.push(`/users/${userInfo._id}`);
    handleClose()
  };
  const getOrders = () => {
    router.push(`/users/${userInfo._id}/orders/`);
    handleClose()
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* <Avatar sx={{ width: 32, height: 32, textTransform: "capitalize" }}>
              {userInfo?.name[0]}
            </Avatar> */}
            <Image src="/avatar.gif" alt="avatar" width={40} height={40} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {userInfo?._isAdmin && (
          <MenuItem onClick={() => router.push("/dashboard")}>
            <Image
              src="/dashboard.gif"
              alt="avatar"
              width={40}
              height={40}
              style={{ margin: "0px 5px" }}
            />
           Dashboard
          </MenuItem>
        )}
        <MenuItem onClick={getProfile}>
          <Image
            src="/avatar.gif"
            alt="avatar"
            width={40}
            height={40}
            style={{ margin: "0px 5px" }}
          />
          My Profile
        </MenuItem>
        <MenuItem onClick={getOrders}>
          <Image
            src="/delivery-carry.gif"
            alt="delivery"
            width={40}
            height={40}
            style={{ margin: "0px 5px" }}
          />
          My Orders
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
