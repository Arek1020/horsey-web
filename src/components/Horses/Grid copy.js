import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import Avatar from "@mui/material/Avatar";
import { SERVER_URL } from '../../config';


const Team = () => {
    const useApi = useFetchWrapper();
    const columns = [
        {
            field: "logo",
            headerName: "Avatar",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params, p) => {
                return <Avatar src={SERVER_URL + '/uploads/avatars/' + params.value} />
                
            },
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "name",
            headerName: "Imie",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "surname",
            headerName: "Nazwisko",
            flex: 1,
            cellClassName: "name-column--cell",
        },
    ];
    const [users, setUsers] = useState([])
    const getData = async () => {
        const payload = {
            all: true
        }
        setUsers(await useApi.post('/user/get', payload))
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Box
            m="40px 0 0 0"
            height="75vh"
            // width="100%"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
            }}
        >
            <DataGrid  rows={users} columns={columns} />
        </Box>
    );
};

export default Team;