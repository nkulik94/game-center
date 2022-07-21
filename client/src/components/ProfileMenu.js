import React from "react";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

function ProfileMenu() {
    return (
        <>
            <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            >
                <AccountCircle />
            </IconButton>
        </>
    )
}

export default ProfileMenu