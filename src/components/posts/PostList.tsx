import * as React from 'react';
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom" 
import { formatDate } from '../../shared/utils';
import { clickHandlerProp } from './models/IProp.interface';

const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1 },
    {
        field: 'author',
        headerName: 'Author',
        sortable: false,
        flex: 1,
        valueGetter: (params: GridValueGetterParams) =>
            params.row.author?.name ?? '-',
    },
    { field: 'summary', headerName: 'Summary', flex: 3 },
    {
        field: 'publishDate',
        headerName: 'Published Date',
        flex: 1,
        valueFormatter: formatDate
    },
];

export default function DataTable ({params,callback}: clickHandlerProp) {
    const navigate = useNavigate()
    // state
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/posts?${params}`)
        .then((response) => response.json())
        .then((data) => setData(data?.posts))
        .finally(() => setLoading(false))
        .catch(error => {
            console.log(error);
            setError(error);
        });
    }, [])

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    onCellClick={(params) => callback(params.row.id)}
                />
            </div>
        </div>
    );
}