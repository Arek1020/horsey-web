import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    TextField,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CircularProgress,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useParams, Link } from 'react-router-dom';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import Avatar from '@mui/material/Avatar';
import { SERVER_URL } from '../../config'
import { useFormik, useFormikContext } from 'formik';
import LoadingOverlay from 'react-loading-overlay';

export default function UsersScreen() {
    const useApi = useFetchWrapper();

    const params = useParams();

    const [user, setUser] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        useApi.post('/user/get', { id: params.id }).then((u) => {
            setUser(u[0])
        })
    }, [])



    const initialValues = {}

    const formik = useFormik({
        initialValues: {
            id: user?.id,
            email: '',
            name: '',
            phone: '',
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true)
            setSuccess(true)
            const result = await useApi.post('/user/update', values)
            setLoading(false)
            setTimeout(() => {setSuccess(false)}, 2000)
        },
    });

    useEffect(() => {
        setAvatarUrl(user?.logo ? SERVER_URL + '/uploads/avatars/' + user?.logo : null)
        formik.setFieldValue('email', user?.email)
        formik.setFieldValue('name', user?.name)
        formik.setFieldValue('phone', user?.phone)
    }, [user])


    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };


    return (
        <Box style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <LoadingOverlay
                active={loading}
                spinner={true}
                text='Ładowanie...'
            >
            </LoadingOverlay>
            <Card sx={{ width: 345 }} style={styles.userCard}>
                <CardMedia
                    component="img"
                    alt={user?.name}
                    height="200"
                    width="100"
                    image={avatarUrl ? avatarUrl : require('../../assets/user.jpg')}
                />

                <Box style={styles.body}>
                    <form onSubmit={formik.handleSubmit}>
                        <Box>
                            <TextField
                                margin="normal"
                                variant="filled"
                                required
                                id="email"
                                label="Email / Login"
                                name="email"
                                autoComplete="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                style={styles.textInput}
                                autoFocus={true}
                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                required
                                id="name"
                                label="Imie i nazwisko"
                                name="name"
                                autoComplete="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                style={styles.textInput}
                                autoFocus={true}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                required
                                id="phone"
                                label="Telefon"
                                name="phone"
                                autoComplete="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                style={styles.textInput}

                                autoFocus={true}
                            />
                        </Box>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button style={{ display: 'flex', margin: 'auto', marginTop: 20 }} sx={buttonSx}type='submit' variant='contained' size="large">Zapisz</Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </form>

                </Box>
                {/* <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions> */}

            </Card>
            <Card sx={{ width: 345 }} style={{ width: '35%', marginLeft: 10 }}>
                <Box style={styles.header}>
                    Przypisane konie
                </Box>
                <Box style={styles.body}>
                    {user?.horses?.map(horse => (
                        <Link key={horse.id} to={`/horse/${horse.id}`} style={{ textDecoration: 'none', color: 'unset' }}>
                            <Card sx={{ display: 'flex', height: 100, marginTop: 1 }}>
                                <Box sx={{ display: 'flex' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 100 }}
                                        image={horse?.primaryImage ? SERVER_URL + '/uploads' + horse?.primaryImage : require('../../assets/horse.png')}
                                        alt="Live from space album cover"
                                    />
                                    <CardContent >

                                        <Typography component="div" variant="h7">
                                            {horse.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {horse.user == user.id ? 'Właściciel' : 'Przypisany'}
                                        </Typography>
                                    </CardContent>


                                </Box>

                            </Card>
                        </Link>
                    ))}
                </Box>

            </Card>
            {/* {user} */}
            {/* <UsersGrid/> */}
        </Box>
    );
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
        width: 'calc(50% - 10px)'
    }

}
