import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from "@mui/material/IconButton";

function AdvancedSearch() {
    const [searched, setSearched] = useState('')

    return (
        <FormControl sx={{marginTop: 2}}>
            <Input
            startAdornment={
                <InputAdornment position="start">
                    <IconButton type="submit">
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            }
            placeholder="Search Games"
            value={searched}
            onChange={e => setSearched(e.target.value)}
            />
        </FormControl>
    )
}

export default AdvancedSearch