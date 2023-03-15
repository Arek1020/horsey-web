import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import SettingsForm from '../components/UserSettings/FormSettings'
import AvatarEdit from '../components/UserSettings/AvatarEdit'
// import Deposits from './Deposits';
// import Orders from './Orders';



function DashboardContent() {

    return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <AvatarEdit/>
            <SettingsForm />
        </Container>

    );
}

export default function SettingsScreen() {

    return <DashboardContent />;
}