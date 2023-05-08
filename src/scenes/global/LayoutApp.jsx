// react libraries
import React, { useContext, useState } from "react";
import { useNavigate, Link, Routes, Route } from "react-router-dom";

// ant design layouts
import { Button, Dropdown, Layout, Menu, theme } from "antd";

import jwt_decode from "jwt-decode";

// ant design icons
import {
  UserOutlined,
  UsergroupAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

// material ui icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import FactoryIcon from "@mui/icons-material/Factory";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

// components
import Dashboard from "../dashboard/Dashboard";
import Users from "../users/Users";
import Employees from "../empoyees/Employees";
import Reports from "../reports/Reports";
import NotFound from "../sessions/NotFound";
import { Box, IconButton } from "@mui/material";
import Groups2Icon from "@mui/icons-material/Groups2";
import AuthContext from "../../context/AuthProvider";
const { Header, Content, Footer, Sider } = Layout;

import logo from "../../assets/waltana_red.png";
import AddNewEmployee from "../empoyees/AddNewEmployee";

const LayoutApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  let decoded;

  if (auth != null) {
    decoded = jwt_decode(auth);
  }

  const drop_down_items = [
    {
      key: "1",
      label: "Profile",
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      key: "2",
      label: "Logout",
      onClick: () => {
        handleLogout();
      },
    },
    {
      key: "3",
      label: "",
    },
  ];

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("auth-token");
    navigate("/login");
  };
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          } else {
            setCollapsed(false);
          }
        }}
        onCollapse={(collapsed, type) => {
          console.log("collapse: ", collapsed, type);
        }}
        style={{
          minHeight: "100vh",
        }}
      >
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "flex-start",
            fontSize: 18,
            color: "white",
            padding: 20,
            marginLeft: 10,
          }}
        >
          <Link className="nik__logo" to="/">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>Waltana</p>{" "}
              <img
                src={logo}
                width={30}
                height={30}
                style={{ marginLeft: 10 }}
              />
            </div>
          </Link>
        </div>
        {
          // decoded?.userType === "admin" ? <Menu
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              { label: "Dashboard", icon: <DashboardIcon />, key: "/" },
              { label: "Users", icon: <Groups2Icon />, key: "/users" },
              { label: "Reports", icon: <FactoryIcon />, key: "/reports" },
              { label: "Employees", icon: <UserOutlined />, key: "/employees" },
            ]}
            onClick={({ key }) => {
              navigate(key);
              if (window.innerWidth < 992) {
                setCollapsed(true);
              }
            }}
          />
          // : <Menu
          //     theme="dark"
          //     mode="inline"
          //     defaultSelectedKeys={['1']}
          //     items={[
          //         { label: "Warehouses", icon: <FactoryIcon />, key: "/warehouses" },
          //         { label: "Categories", icon: <CategoryIcon />, key: "/categories" },
          //         { label: "Products", icon: <ProductionQuantityLimitsIcon />, key: "/products" },
          //         { label: "Stocks", icon: <StorefrontIcon />, key: "/stocks" },
          //         { label: "Orders", icon: <ViewStreamIcon />, key: "/orders" },
          //     ]}
          //     onClick={({ key }) => {
          //         navigate(key)
          //         if (window.innerWidth < 992) {
          //             setCollapsed(true)
          //         }
          //     }}
          // />
        }
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            zIndex: 1,
            color: "black",
          }}
        >
          <Box
            style={{
              marginLeft: 10,
              marginRight: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ marginLeft: 10, fontSize: 20 }}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </div>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <div className="user__profile">

                            </div> */}
              {/* <p>admin@a.com : admin</p> */}

              {/* <p>John Doe</p> */}

              <Dropdown
                menu={{
                  items: drop_down_items,
                }}
                placement="bottom"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p>
                    {decoded != null
                      ? decoded.user.first_name + " " + decoded.user.last_name
                      : ""}{" "}
                    : <strong>{decoded != null ? decoded.userType : ""}</strong>{" "}
                  </p>
                  <ArrowDropDownOutlinedIcon />
                </div>
              </Dropdown>

              <IconButton>
                <NotificationsIcon />
              </IconButton>
            </Box>
          </Box>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <Routes>
            <Route>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/add_employee" element={<AddNewEmployee />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Developed by{" "}
          <a href="https://sabawyan.tech/" target="_blank">
            Sabawyan Tech
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutApp;
