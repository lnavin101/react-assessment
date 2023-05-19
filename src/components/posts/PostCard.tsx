import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { IPost } from './models/IPost.interface';
import { Chip, Grid, Pagination, Stack } from '@mui/material';
import { formatDate } from '../../shared/utils';
import { clickHandlerProp } from './models/IProp.interface';
import Loader from '../core/Loader';

export default function PostCard({params,callback}: clickHandlerProp) {
    // state
    const [data, setData] = useState<IPost[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const totalPage = Math.floor((data?.length ?? 1) / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        setLoading(true); // update loading state
        fetch(`/api/posts?${params}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .finally(() => setLoading(false))
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, [params]) // re-fetch when params change

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
     };

    return (
        <div>
            <Grid container spacing={1}>
            {
                loading ?
                <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="flex-start"
                >
                {
                     Array.from(new Array(5)).map((val, i)=>{
                        return <Loader key={i}/>
                    })
                }
                </Grid>:
                
                currentPosts?.map((post: IPost, i: number) => {
                    return <Grid key={i}>
                    <Card className='card' key={i} variant="outlined" onClick={() =>callback(post.id)} sx={{ height: 500, width: 345, borderRadius: 10, margin: 1.5}}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} src={post?.author.avatar} aria-label="author">
                                </Avatar>
                            }
                            title={post?.author.name}
                            subheader={formatDate(post?.publishDate)}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {post?.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {post?.summary}
                            </Typography>
                            <br />
                            {post?.categories.map((value: any, i: number) => <Chip key={i} sx={{ margin: 0.5 }} label={value?.name} />)}
                        </CardContent>
                    </Card>
                    </Grid>
                })
            }
            </Grid>
            <Stack spacing={2} sx={{float: 'right', margin: 5}}>
                <Pagination count={totalPage} page={currentPage} variant="outlined" shape="rounded" onChange={(event, page) => paginate(page)} />
            </Stack>
        </div>

    );
}