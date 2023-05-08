import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { borderRadius, padding } from "@mui/system";
import admin_img from "../../assets/admin_img.png";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import PersonIcon from "@mui/icons-material/Person";

function Header() {
  return (
    <div className="header_top">
      <Box display="flex" justifyContent="space-between" padding={3}>
        <Box></Box>

        <Box display="flex">
          <Box display="flex">
            <IconButton>
              <NotificationsIcon />
            </IconButton>

            <div className="header__img_container">
              <img className="header__admin__img" src={admin_img} alt="" />
            </div>

            <div className="dropdown">
              <p className="dropbtn">
                Admin <ArrowDropDownOutlinedIcon />
              </p>
              <div className="dropdown-content">
                <a href="#">Profile</a>
                <a href="#">Logout</a>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Header;
