import * as React from 'react';
import Box from '@mui/material/Box';
import UsersGrid from '../../components/Users/Grid'

export default function UsersScreen() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    
    React.useEffect(() => {
    }, [])

    

    return (
        <Box style={{width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
            <UsersGrid/>
        </Box>
    );
}
