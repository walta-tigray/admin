import React from 'react'
import { MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function SidebarItems({ title, icon, selected, setSelected, link }) {
    return (
        <div style={{ marginTop: 20 }}>
            <MenuItem active={selected === title} style={{
                color: "#82889c"
            }} onClick={() => { setSelected(title) }}
                icon={icon}>
                <Typography>
                    {title}
                </Typography>
                <Link to={link} />
            </MenuItem>
        </div>
    )
}

export default SidebarItems