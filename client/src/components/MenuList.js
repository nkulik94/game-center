import React from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function MenuList({ onClickList }) {
    const options = ["Home", "About", "Games", "Contact"]

    return (
        <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => onClickList(false)}
        >
            <List>
                {options.map(option => {
                    return (
                        <ListItem key={option} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={option} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}

export default MenuList