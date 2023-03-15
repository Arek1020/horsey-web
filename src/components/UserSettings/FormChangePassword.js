import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


const initialValues = {
    currentPassword: '',
    newPassoword: '',
    newPassword2: ''
}

export default function FormChangePassword() {
    const [formValues, setFormValues] = useState(initialValues);

    const handleInputChange = e => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
        window.formChangePassword = formValues;
    }

    useEffect(() => {
       
    }, [])
    return (
        <React.Fragment>
            
            <form id='changeForm'>
                <Grid container spacing={3}>
                    {/* <Grid item spacing={3} xs={12} md={8} lg={9}> */}
                    <Grid item xs={6} sm={16}>
                        <TextField
                            required
                            id="currentPassword"
                            name="currentPassword"
                            label="Aktualne hasło"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            type="password"
                            // value={formValues.email}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="newPassoword"
                            name="newPassoword"
                            label="Nowe hasło"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            type="password"
                            // value={formValues.name}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="newPassword2"
                            name="newPassword2"
                            label="Powtórz hasło"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                            type="password"
                            // value={formValues?.surname}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    {/* <Button variant="outlined" style={{marginTop: '10px'}} >Zmień hasło</Button> */}
                    {/* <DialogChangePassword /> */}
                    {/* </Grid> */}


                </Grid>
            </form>
        </React.Fragment>
    );
}

