import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import HorsesActions from './HorsesActions';
import { SERVER_URL } from '../../config';

const Horses = ({ setSelectedLink, link }) => {
    const useApi = useFetchWrapper();
  

    const [pageSize, setPageSize] = useState(10);
    const [rowId, setRowId] = useState(null);

    const [horses, setHorses] = useState([])
    const getData = async () => {
        const payload = {
            all: true,
            force: true
        }
        setHorses(await useApi.post('/horse/get', payload))

    }

    useEffect(() => {
        getData();
    }, [])

    const columns = [

        {
            field: "primaryImage",
            headerName: "Avatar",
            width: 60,
            cellClassName: "name-column--cell",
            sortable: false,
            filterable: false,
            renderCell: (params, p) => <Avatar src={SERVER_URL + '/uploads' + params.value} />,
        },
        {
            field: "name",
            headerName: "Imie",
            flex: 1,
            cellClassName: "name-column--cell",
            editable: true,
        },
        {
            field: "race",
            headerName: "Rasa",
            flex: 1,
            editable: true,
        },
        {
            field: "stable",
            headerName: "Stajnia",
            flex: 1,
            editable: true,
        },
        {
            field: 'active',
            headerName: 'Aktywny',
            width: 100,
            type: 'boolean',
            editable: true,
        },
        {
            field: 'actions',
            headerName: 'Akcje',
            type: 'actions',
            renderCell: (params) => (
                <HorsesActions {...{ params, rowId, setRowId }} />
            ),
        },
    ]
    return (
        <Box
            sx={{
                height: '70vh',
                width: '100%',
            }}
            
        >
            <Typography
                variant="h4"
                component="h4"
                sx={{ textAlign: 'center', mt: 3, mb: 3 }}
            >
                Zarządzanie końmi
            </Typography>
            <DataGrid
                columns={columns}
                rows={horses}
                getRowId={(row) => row.id}
                rowsPerPageOptions={[10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                    [`& .${gridClasses.row}`]: {
                        bgcolor: (theme) =>
                            theme.palette.mode === 'light' ? grey[200] : grey[900],
                    },
                }}
                onCellEditCommit={(params) => setRowId(params.id)}
                style={{
                    margin: 10,
                }}
            />
        </Box>
    );
};

export default Horses;