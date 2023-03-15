import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import ReportsActions from './ReportsActions';
import { SERVER_URL } from '../../config';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';

const Reports = ({ setSelectedLink, link }) => {
    const useApi = useFetchWrapper();


    const [pageSize, setPageSize] = useState(10);
    const [rowId, setRId] = useState(null);



    const [reports, setReports] = useState([])
    const getData = async () => {
        const payload = {

        }
        var rep = await useApi.post('/user/report/get', payload)
        for (var r of rep) {
            r.avatar = r.user?.logo
            r.name = r.user?.name
        }

        setReports(rep)
        // setRId(0)

    }

    const setRowId = async (id, user) => {
        setRId(id)

        await useApi.post('/report/update', { id, read: moment().format('YYYY-MM-DD HH:mm:ss'), user: user?.id })
        getData()
    }

    useEffect(() => {
        getData();
    }, [])

    const columns = [

        {
            field: "avatar",
            headerName: "Avatar",
            width: 60,
            cellClassName: "name-column--cell",
            sortable: false,
            filterable: false,
            renderCell: (params, p) => <Avatar src={SERVER_URL + '/uploads/avatars/' + params.value} />,
        },
        {
            field: "name",
            headerName: "Imie",
            cellClassName: "name-column--cell",
            width: 200,
            // renderCell: (params, p) => params.value,
        },
        {
            field: "type",
            headerName: "Rodzaj",
            // flex: 1,
            cellClassName: "name-column--cell",
            width: 200
        },
        {
            field: "message",
            headerName: "Wiadomość",
            flex: 1,
        },

        {
            field: 'actions',
            headerName: 'Akcje',
            type: 'actions',
            renderCell: (params) => {
                return <ReportsActions {...{ params: params.row, rowId, setRowId }} />
            },
        },
    ]
    return (
        <Box style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <Box
                sx={{
                    height: '70vh',
                    width: '65%',
                }}
            >
                {/* <Typography
                    variant="h4"
                    component="h4"
                    sx={{ textAlign: 'center', mt: 3, mb: 3 }}
                >
                    Zgłoszenia
                </Typography> */}
                <DataGrid
                    columns={columns}
                    rows={reports}
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5, 10, 20]}
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
            <Box
                sx={{
                    height: '70vh',
                    width: '30%',
                    paddingTop: '10px',
                }}
            >
                <Card style={{ width: '100%', marginLeft: 10 }}>
                    <Box style={styles.header}>
                        Zgłoszenie
                    </Box>
                    <Box style={styles.body}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography style={{ fontWeight: 600 }}>Użytkownik:</Typography>
                            <Link to={`/user/${reports.find(x => x.id == rowId)?.user?.id}`} >{reports.find(x => x.id == rowId)?.user?.name}</Link>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography style={{ fontWeight: 600 }}>Typ:</Typography>
                            <Typography>{reports.find(x => x.id == rowId)?.type}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography style={{ fontWeight: 600 }}>Wiadomość:</Typography>
                            <Typography>{reports.find(x => x.id == rowId)?.message}</Typography>
                        </Box>

                    </Box>

                </Card>
            </Box>
        </Box>

    );
};


const styles = {
    container: {
        flexDirection: 'row',
    },
    userCard: {
        height: '100%',
        width: '60%'
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#00498f',
        color: 'white',
        width: '100%',
        padding: 10
    },
    body: {
        // display: 'flex',
        // justifyContent: 'center',
        padding: 10
    },
    textInput: {
        margin: 5,
        width: '48%'
    }

}


export default Reports;