import React, { useState } from "react";
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GameList from "./GameList";

function ListTabs({ likeList }) {
    const [value, setValue] = useState('0')
    return (
        <Box>
            <TabContext value={value} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={(_, value) => setValue(value)} centered >
                    <Tab value='0' label="Likes" />
                    <Tab value='1' label='Ratings' />
                    <Tab value='2' label='Reviews' />
                </TabList>
            </Box>
            <TabPanel value='0'>
                <GameList games={likeList} isMainList={false} />
            </TabPanel>
            <TabPanel value='1'>
                hello
            </TabPanel>
            <TabPanel value='2'>
                dude
            </TabPanel>
            </TabContext>
        </Box>
    )
}

export default ListTabs