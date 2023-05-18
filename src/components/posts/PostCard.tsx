import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { IAllPost, IPost } from './models/IPost.interface';
import { Chip, Grid, Pagination, Stack } from '@mui/material';
import { formatDate } from '../../shared/utils';
import { clickHandlerProp } from './models/IProp.interface';

export default function PostCard({params,callback}: clickHandlerProp) {
    // state
    const [data, setData] = useState<IAllPost>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const totalPage = (data?.posts.length ?? 1) / postsPerPage;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data?.posts.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
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
                currentPosts?.map((post: IPost) => {
                    return <Grid>
                    <Card key={post.id} onClick={() =>callback(post.id)} sx={{ height: 500, width: 345, borderRadius: 10, margin: 1.5}}>
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
                            {post?.categories.map((value: any, i: number) => <Chip sx={{ margin: 0.5 }} label={value?.name} />)}
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
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