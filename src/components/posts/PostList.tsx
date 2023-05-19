import { LinearProgress } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { formatDate } from '../../shared/utils';
import { IPost } from './models/IPost.interface';
import { clickHandlerProp } from './models/IProp.interface';

// table headers
const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', headerClassName: 'table-header', flex: 1 },
    {
        field: 'author',
        headerName: 'Author',
        headerClassName: 'table-header', // set className to target via css later
        sortable: false,
        flex: 1,
        valueGetter: (params: GridValueGetterParams) => // display cell value from nested obj
            params.row.author?.name ?? '-',
    },
    { field: 'summary', headerName: 'Summary', headerClassName: 'table-header', flex: 3 },
    {
        field: 'publishDate',
        headerName: 'Published Date',
        headerClassName: 'table-header',
        flex: 1,
        valueFormatter: formatDate // format cell value 
    },
];

export default function DataTable ({params,callback}: clickHandlerProp) {
    // state
    const [data, setData] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/posts?${params}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .finally(() => setLoading(false))
        .catch(error => {
            console.log(error);
            setError(error);
        });
    }, [params])

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={loading}
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    onCellClick={(params) => callback(params.row.id)}
                    sx={{
                        boxShadow: 2
                      }}
                    getRowClassName={(params) => 'row'}
                />
            </div>
        </div>
    );
}