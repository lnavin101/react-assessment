import { Box, Skeleton } from "@mui/material";

export default function Loader() {
    return (
        <div>
            <Box sx={{ pt: 1.5 }}>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="circular" width={40} height={40} sx={{ marginBottom: 0.5 }} />
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
        </div>
    )
}