import * as React from 'react';
import Box from '@mui/material/Box';
import HorsesGrid from '../../components/Horses/Grid'

export default function HorsesScreen() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    
    React.useEffect(() => {
    }, [])

    

    return (
        <Box style={{width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
            <HorsesGrid/>
        </Box>
    );
}
