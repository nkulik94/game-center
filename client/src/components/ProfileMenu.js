import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { lightBlue } from '@mui/material/colors';

function ProfileMenu({ avatar }) {
    const setUser = useContext(UserContext).setUser
    const [anchor, setAnchor] = useState(null)

    function handleLogOut() {
        fetch('/logout', {method: 'DELETE'})
        .then(() => setUser(null))
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
                    <Avatar sx={{ bgcolor: lightBlue[700] }} src={avatar} />
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
                <MenuItem component={Link} to="/profile" onClick={() => setAnchor(null)}>Profile</MenuItem>
                <MenuItem
                    onClick={() => {
                        setAnchor(null)
                        handleLogOut()
                        }}
                    >
                        Sign Out
                    </MenuItem>
              </Menu>
        </>
    )
}

export default ProfileMenu