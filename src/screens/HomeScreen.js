import { useContext, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../components/Charts/UsersChart';
import UsersHorsesChart from '../components/Charts/UsersHorsesChart';
import UsersActivityChart from '../components/Charts/UsersActivityChart';
import { useNavigate } from "react-router-dom";
import { useAuthUser } from 'react-auth-kit'
import { useFetchWrapper } from '../hooks/useFetchWrapper';



function DashboardContent() {
    const useApi = useFetchWrapper();

    const auth = useAuthUser()

    const navigate = useNavigate();

    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };


    // useEffect(() => {
    //     async function fetchData() {
    //         const stats = await useApi.post('/stats/newUsersPerMonths')

    //     }
    //     fetchData
    //     console.log('sdfdsf', stats)
    // }, [])

    return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={7}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 350,
                        }}
                    >
                        <Chart />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={25} md={4} lg={5}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 350,
                        }}
                    >
                        <UsersHorsesChart />
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',height: 350, }}>
                        <UsersActivityChart />
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    );
}

export default function Dashboard() {
    return <DashboardContent />;
}