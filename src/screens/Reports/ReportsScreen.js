import React, { useEffect, useState } from 'react'
import {
    Box,
    Card,
    TextField,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    CardActions,
    Button
} from '@mui/material';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import ReportsGrid from '../../components/Reports/Grid'


export default function ReportsScreen() {
    const useApi = useFetchWrapper();

    const [reports, setReports] = useState();

    return (
        <Box style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <ReportsGrid />
        </Box>
    )
}


const styles = {
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
