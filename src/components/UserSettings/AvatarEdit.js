import React from 'react';
import ImageUpload from "./ImageUpload";
import Typography from '@mui/material/Typography';

const AvatarEdit = () => {


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
               Awatar
            </Typography>
            <ImageUpload name="avatar"/>
        </React.Fragment>
    )
}

export default AvatarEdit;