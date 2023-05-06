import React, { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FactoryIcon from '@mui/icons-material/Factory';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarItems from './SidebarItems';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EngineeringIcon from '@mui/icons-material/Engineering';

function Sidebar() {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <div className="sidebar__wrapper">
            <Box sx={{
                "& .pro-sidebar-inner": {
                    bgcolor: "#f4f6fa !important"
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: " 5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#799ade !important"
                },
                "& .pro-menu-item.active": {
                    color: "#6184cb !important"
                }
            }}>

                <ProSidebar collapsed={isCollapsed}>
                    <Menu iconShape="square">
                        <MenuItem
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            icon={isCollapsed ? <MenuIcon /> : undefined}
                            style={{
                                margin: "10px 0 20px 0",
                                color: "#5b83d7",
                            }}
                        >
                            {!isCollapsed && (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    ml="15px"
                                >
                                    <Typography variant="h3" color="#5b83d7" fontSize={24} fontFamily="Poppins" fontWeight={800}>
                                        ADMIN PORTAL
                                    </Typography>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                        <MenuIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem>

                        <Box marginTop={5} paddingLeft={isCollapsed ? undefined : "5%"}>
                            <SidebarItems
                                title='Dashboard'
                                link='/'
                                icon={<DashboardIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <SidebarItems
                                title='Warehouses'
                                link='/warehouses'
                                icon={<FactoryIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <SidebarItems
                                title='Employees'
                                link='/employees'
                                icon={<EngineeringIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <SidebarItems
                                title='Customers'
                                link='/customers'
                                icon={<Diversity3Icon />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                        </Box>
                    </Menu>
                </ProSidebar>
            </Box>
        </div>
    )
}

export default Sidebar