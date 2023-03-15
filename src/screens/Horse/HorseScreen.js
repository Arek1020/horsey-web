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
import { SERVER_URL } from '../../config'
import { useFormik, useFormikContext } from 'formik';
import moment from 'moment';
import NutritionCard from './NutritionCard';

export default function HorseScreen() {
    const useApi = useFetchWrapper();

    const params = useParams();

    const [horse, setHorse] = useState(null);
    const [attached, setAttached] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };


    useEffect(() => {
        useApi.post('/horse/get', { id: params.id }).then((h) => {
            setHorse(h[0])
            useApi.post('/horse/attached/get', { horse: params.id }).then((a) => {
                setAttached(a)
                useApi.post('/user/get', { id: h[0]?.user }).then((u) => {
                    if (u.length > 0) {
                        u[0].owner = true
                        u[0].userId = u[0].id
                        setAttached(a.concat(u))
                    }
                })
            })
        })



    }, [])

    useEffect(() => {

    }, [horse])



    const initialValues = {}

    const formik = useFormik({
        initialValues: {
            id: horse?.id,
            name: '',
            race: '',
            year: '',
            weight: '',
            height: '',
            gender: '',
            pregnant: '',
            work: '',
            workType: '',
            stable: '',
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true)
            setSuccess(true)
            const result = await useApi.post('/horse/update', values)
            setLoading(false)
            setTimeout(() => { setSuccess(false) }, 2000)
        },
    });

    useEffect(() => {
        setAvatarUrl(horse?.primaryImage ? SERVER_URL + '/uploads' + horse?.primaryImage : require('../../assets/horse.png'))
        formik.setFieldValue('name', horse?.name || '')
        formik.setFieldValue('race', horse?.race || '')
        formik.setFieldValue('year', horse?.year ? moment(horse?.year).format('YYYY-MM-DD') : '')
        formik.setFieldValue('weight', horse?.weight || '')
        formik.setFieldValue('height', horse?.height || '')
        formik.setFieldValue('gender', horse?.gender || '')
        formik.setFieldValue('pregnant', horse?.pregnant || '')
        formik.setFieldValue('work', horse?.work || '')
        formik.setFieldValue('workType', horse?.workType || '')
        formik.setFieldValue('stable', horse?.stable || '')
    }, [horse])





    return (
        <Box >
            <Box style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                <Card sx={{ width: 345 }} style={styles.userCard}>
                    <CardMedia
                        component="img"
                        alt={horse?.name}
                        height="200"
                        image={avatarUrl}
                    />

                    <Box style={styles.body}>
                        <form onSubmit={formik.handleSubmit}>
                            <Box>
                                <TextField
                                    margin="normal"
                                    variant="filled"
                                    id="name"
                                    label="Imie konia"
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
                                    id="race"
                                    label="Rasa"
                                    name="race"
                                    value={formik.values.race}
                                    onChange={formik.handleChange}
                                    error={formik.touched.race && Boolean(formik.errors.race)}
                                    style={styles.textInput}

                                    autoFocus={true}
                                />
                                <TextField
                                    margin="normal"
                                    variant="filled"
                                    id="year"
                                    label="Rok"
                                    name="year"
                                    value={formik.values.year}
                                    onChange={formik.handleChange}
                                    error={formik.touched.year && Boolean(formik.errors.year)}
                                    style={styles.textInput}
                                    autoFocus={true}
                                />
                                <TextField
                                    margin="normal"
                                    variant="filled"
                                    id="weight"
                                    label="Waga"
                                    name="weight"
                                    value={formik.values.weight}
                                    onChange={formik.handleChange}
                                    error={formik.touched.weight && Boolean(formik.errors.weight)}
                                    style={styles.textInput}
                                    autoFocus={true}
                                />
                                <TextField
                                    margin="normal"
                                    variant="filled"
                                    id="height"
                                    label="Wysokość"
                                    name="height"
                                    value={formik.values.height}
                                    onChange={formik.handleChange}
                                    error={formik.touched.height && Boolean(formik.errors.height)}
                                    style={styles.textInput}
                                    autoFocus={true}
                                />
                                <TextField
                                    margin="normal"
                                    variant="filled"
                                    id="gender"
                                    label="Płeć"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                                    style={styles.textInput}
                                    autoFocus={true}
                                />
                                <TextField
                                    margin="normal"
                                    variant="filled"
                                    id="pregnant"
                                    label="Ciąża"
                                    name="pregnant"
                                    value={formik.values.pregnant}
                                    onChange={formik.handleChange}
                                    error={formik.touched.pregnant && Boolean(formik.errors.pregnant)}
                                    style={styles.textInput}
                                    autoFocus={true}
                                />
                                <TextField
                                    margin="normal"
                                    variant="filled"
                                    id="work"
                                    label="Praca"
                                    name="work"
                                    value={formik.values.work}
                                    onChange={formik.handleChange}
                                    error={formik.touched.work && Boolean(formik.errors.work)}
                                    style={styles.textInput}
                                    autoFocus={true}
                                />
                                <TextField
                                    margin="normal"
                                    variant="filled"
                                    id="workType"
                                    label="Rodzaj pracy"
                                    name="workType"
                                    value={formik.values.workType}
                                    onChange={formik.handleChange}
                                    error={formik.touched.workType && Boolean(formik.errors.workType)}
                                    style={styles.textInput}
                                    autoFocus={true}
                                />
                                <TextField
                                    margin="normal"
                                    variant="filled"
                                    id="stable"
                                    label="Stajnia"
                                    name="stable"
                                    value={formik.values.stable}
                                    onChange={formik.handleChange}
                                    error={formik.touched.stable && Boolean(formik.errors.stable)}
                                    style={styles.textInput}
                                    autoFocus={true}
                                />
                            </Box>

                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Button style={{ display: 'flex', margin: 'auto', marginTop: 20 }} sx={buttonSx} type='submit' variant='contained' size="large">Zapisz</Button>
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
                        Przypisani użytkownicy
                    </Box>
                    <Box style={styles.body}>
                        {attached.map(horse => (
                            <Link key={horse.id} to={`/user/${horse.userId}`} style={{ textDecoration: 'none', color: 'unset' }}>
                                <Card sx={{ display: 'flex', height: 100, marginTop: 1 }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100 }}
                                            image={horse?.logo ? SERVER_URL + '/uploads/avatars/' + horse?.logo : require('../../assets/user.jpg')}
                                            alt={horse?.name}
                                        />
                                        <CardContent >

                                            <Typography component="div" variant="h7">
                                                {horse.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {horse.owner ? 'Właściciel' : 'Przypisany'}
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
            <Box style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: 10 }}>
                <NutritionCard horse={horse} />
            </Box>

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
