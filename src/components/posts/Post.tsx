import { Autocomplete, Grid, IconButton, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PostCard from "./PostCard";
import PostList from "./PostList";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

// filter options
const options = [
    "Data Management",
    "Digital Marketing",
    "Ecommerce",
    "Email Marketing",
    "Landing Pages",
    "Marketing Analytics",
    "Marketing Automation",
    "Platform News and Updates",
    "Tips and Best Practise",
    "Surveys and Forms"
];

export default function Post() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [view, setView] = useState('card');
    const [filter, setFilter] = useState(false);

    const handleViewChange = (
        event: React.MouseEvent<HTMLElement>,
        newView: string,
    ) => {
        setView(newView);
    };

    const handleClick = (id: string) => {
        return navigate(`/detail/${id}`)
    }

    const handleFilter = () => {
        setFilter(!filter);
    }

    /** set query params to url */
    const handleFilterChange = (event: SyntheticEvent, value: string | null) => {
        value ? setSearchParams({'categories': value}):
        setSearchParams();
    }

    return (
        <div>
            <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <h1>Latest Posts</h1>
                </Grid>
            <Grid container spacing={3} justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
                <Grid item>
                    <ToggleButtonGroup
                        color="primary"
                        value={view}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="Platform"
                        sx={{ margin: 1.5 }}
                    >
                        <ToggleButton value="card">Card View</ToggleButton>
                        <ToggleButton value="table">Table View</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item>
                    <Grid container justifyContent="flex-end" alignItems="center">
                        <Grid item>
                            {filter ? <Autocomplete
                                disablePortal
                                id="category-filter"
                                onChange={handleFilterChange}
                                options={options}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Choose Category" />}
                            /> : <div />}
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleFilter} size="large" aria-label="filter" color="primary">
                                {!filter ?
                                    <FilterAltIcon /> : <FilterAltOffIcon />}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {view === 'card' ?
                <PostCard params={searchParams} callback={handleClick}></PostCard> :
                <PostList params={searchParams} callback={handleClick}></PostList>
            }
        </div>
    )
}