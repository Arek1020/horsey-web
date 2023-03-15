import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
// import { useValue } from '../../../context/ContextProvider';
// import { getUsers } from '../../../actions/user';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import UsersActions from './UsersActions';
import { SERVER_URL } from '../../config';

const Users = ({ setSelectedLink, link }) => {
    const useApi = useFetchWrapper();
    //   const {
    //     state: { users },
    //     dispatch,
    //   } = useValue();

    const [pageSize, setPageSize] = useState(10);
    const [rowId, setrId] = useState(null);

    const setRowId = (id) => {
        useApi.post('/report/read', { id })
        setrId(id)
    }

    const [users, setUsers] = useState([])
    const getData = async () => {
        const payload = {
            all: true,
            force: true
        }
        setUsers(await useApi.post('/user/get', payload))


    }

    useEffect(() => {
        getData();
    }, [])

    const columns = [

        {
            field: "logo",
            headerName: "Avatar",
            width: 60,
            cellClassName: "name-column--cell",
            sortable: false,
            filterable: false,
            renderCell: (params, p) => <Avatar src={SERVER_URL + '/uploads/avatars/' + params.value} />,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            cellClassName: "name-column--cell",
            editable: true,
        },
        {
            field: "name",
            headerName: "Imie",
            flex: 1,
            cellClassName: "name-column--cell",
            editable: true,
        },
        {
            field: "date",
            headerName: "Data rejestracji",
            flex: 1,
            cellClassName: "name-column--cell",
            editable: true,
            renderCell: (params, p) => <>{params.value ? moment(params.value).format('YYYY.MM.DD HH:mm') : ''}</>,
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
                <UsersActions {...{ params, rowId, setRowId }} />
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
                Zarządzanie użytkownikami
            </Typography>
            <DataGrid
                columns={columns}
                rows={users}
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

export default Users;