import { Box, Skeleton } from "@mui/material";

export function LoaderCard() {
    return (
        <div>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
        </div>
    )
}

export function LoaderDetails() {
    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="text"/>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
            </Box>
        </div>
    )
}