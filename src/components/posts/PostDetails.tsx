import { Avatar, Chip, Divider, Grid, Paper, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../shared/utils';
import { IPost } from './models/IPost.interface';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { LoaderDetails } from '../core/Loader';

export default function Detail() {
    const params = useParams();

    // state
    const [data, setData] = useState<IPost>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/posts/${params.id}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .finally(() => setLoading(false))
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, [])

    return (
        <div>
            {
                loading ?
                <LoaderDetails/>:
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    {
                        loading ?
                            <Skeleton variant="rectangular" width={210} height={60} /> :
                            <h1>{data?.title}</h1>
                    }
                    {
                        loading ?
                        <Skeleton variant="rounded" width={210} height={60} />:
                        <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <DateRangeIcon sx={{ marginRight: 1 }} />
                        <p>{formatDate(data?.publishDate)}</p>
                    </Grid>
                    }
                    
                </Grid>
                <Divider textAlign="center">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Avatar alt="author" src={data?.author.avatar} sx={{ marginRight: 2 }} />
                        <p>{data?.author.name}</p>
                    </Grid>
                </Divider>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <h3>Summary</h3>
                    <p>{data?.summary}</p>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <h3>Categories</h3>
                    {data?.categories.map((value: any, i: number) => <Chip sx={{ margin: 0.5 }} label={value?.name} />)}
                </Grid>
            </Paper>
            }
        </div>
    )
}