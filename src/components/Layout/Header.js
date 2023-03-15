import React, { useEffect, useState } from 'react';
import { Toolbar, IconButton, AppBar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AvatarMenu from '../Layout/Avatar'



const Header = (props) => {
    const toggleDrawer = props.toggleDrawer
    const open = props.open
    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    // onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Panel startowy
                </Typography>

                <AvatarMenu />
            </Toolbar>
        </AppBar>
    )
}

export default Header;