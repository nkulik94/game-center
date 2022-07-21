import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { lightBlue } from '@mui/material/colors';

function ProfileMenu({ setLoggedIn }) {
    const [anchor, setAnchor] = useState(null)

    function handleLogOut() {
        fetch('/logout', {method: 'DELETE'})
        .then(() => setLoggedIn(false))
    }

    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={e => setAnchor(e.currentTarget)}
                >
                    <Avatar sx={{ bgcolor: lightBlue[700] }} >
                        <AccountCircle />
                    </Avatar>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchor)}
                onClose={() => setAnchor(null)}
              >
                <MenuItem onClick={() => setAnchor(null)}>Profile</MenuItem>
                <MenuItem
                    onClick={() => {
                        setAnchor(null)
                        handleLogOut()
                        }}
                    color="error"
                    >
                        Sign Out
                    </MenuItem>
              </Menu>
        </>
    )
}

export default ProfileMenu