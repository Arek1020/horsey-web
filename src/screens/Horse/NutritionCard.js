import React, { useState, useEffect } from 'react'
import {
    Box,
    Card,
    TextField,
    Button,
    CircularProgress,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useFormik, useFormikContext } from 'formik';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import FoodDoseTable from '../../components/Nutrition/FoodDoseTable';


export default function NutritionCard(params) {

    const useApi = useFetchWrapper();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [nutrition, setNutrition] = useState({
        basics: [],
        fodder: [],
        foodDose: [],
        otherInfo: [],
        otherInfo2: [],
    });

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const [rows, setRows] = useState([{
        id: 1,
        list: [{ id: 1, name: '', amount: 1 }],
        comments: []
    }])

    useEffect(() => {
        useApi.post('/nutrition/get', { horse: params?.horse?.id }).then((n) => {
            n = n[0];
            n = {
                basics: JSON.parse(n?.basics || '[]'),
                fodder: JSON.parse(n?.fodder || '[]'),
                foodDose: n?.foodDose || '[]',
                otherInfo: JSON.parse(n?.otherInfo || '[]'),
                otherInfo2: JSON.parse(n?.otherInfo2 || '[]')
            }
            setNutrition(n)

        })
    }, [params?.horse])

   

    const formik = useFormik({
        initialValues: {
            id: params?.horse?.id,
            stallion: '',
            workHoursDay: '',
            workDaysWeek: '',
            additionalCarousel: '',
            nutritionType: '',
            temperament: '',
            condition: '',
            maintenance: '',
            litter: '',
            paddock: '',
            paddockHours: '',
            pastureQuality: '',
            hayAccess: '',
            roughage: '',
            roughageAmount: '',
            roughageQuality: '',
            waterAccess: '',
            hoofCondition: '',
            allergies: '',
            foodPreferences: '',
            metabolicDiseases: '',
            diseases: '',
            vitamins: '',
            wantToChange: '',
            wantToStay: '',
            wetMeals: '',
            moreDoses: '',
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
        formik.setFieldValue('stallion', nutrition?.basics?.stallion || '')
        formik.setFieldValue('workHoursDay', nutrition?.basics?.workHoursDay || '')
        formik.setFieldValue('workDaysWeek', nutrition?.basics?.workDaysWeek || '')
        formik.setFieldValue('additionalCarousel', nutrition?.basics?.additionalCarousel || '')
        formik.setFieldValue('nutritionType', nutrition?.basics?.nutritionType || '')
        formik.setFieldValue('temperament', nutrition?.basics?.temperament || '')
        formik.setFieldValue('condition', nutrition?.basics?.condition || '')
        formik.setFieldValue('maintenance', nutrition?.basics?.maintenance || '')
        formik.setFieldValue('litter', nutrition?.basics?.litter || '')

        formik.setFieldValue('paddock', nutrition?.fodder?.paddock || '')
        formik.setFieldValue('paddockHours', nutrition?.fodder?.paddockHours || '')
        formik.setFieldValue('pastureQuality', nutrition?.fodder?.pastureQuality || '')
        formik.setFieldValue('hayAccess', nutrition?.fodder?.hayAccess || '')
        formik.setFieldValue('roughage', nutrition?.fodder?.roughage || '')
        formik.setFieldValue('roughageAmount', nutrition?.fodder?.roughageAmount || '')
        formik.setFieldValue('roughageQuality', nutrition?.fodder?.roughageQuality || '')

        formik.setFieldValue('waterAccess', nutrition?.otherInfo?.waterAccess || '')
        formik.setFieldValue('hoofCondition', nutrition?.otherInfo?.hoofCondition || '')
        formik.setFieldValue('allergies', nutrition?.otherInfo?.allergies || '')
        formik.setFieldValue('foodPreferences', nutrition?.otherInfo?.foodPreferences || '')
        formik.setFieldValue('metabolicDiseases', nutrition?.otherInfo?.metabolicDiseases || '')
        formik.setFieldValue('diseases', nutrition?.otherInfo?.diseases || '')
        formik.setFieldValue('vitamins', nutrition?.otherInfo?.vitamins || '')

        formik.setFieldValue('wantToChange', nutrition?.otherInfo2?.wantToChange || '')
        formik.setFieldValue('wantToStay', nutrition?.otherInfo2?.wantToStay || '')
        formik.setFieldValue('wetMeals', nutrition?.otherInfo2?.wetMeals || '')
        formik.setFieldValue('moreDoses', nutrition?.otherInfo2?.moreDoses || '')


        setRows(JSON.parse(nutrition.foodDose[0]?.data || '[]'))

    }, [nutrition])



    return (
        <Card sx={{ width: 345 }} style={styles.userCard}>
            <Box style={styles.header}>
                Żywienie
            </Box>
            <Box style={styles.body}>
                <form onSubmit={formik.handleSubmit}>
                    <Box>
                        <Box>
                            <h3>Podstwowe informacje</h3>
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="stallion"
                                label="Ogier"
                                name="stallion"
                                autoComplete="stallion"
                                value={formik.values.stallion}
                                onChange={formik.handleChange}
                                error={formik.touched.stallion && Boolean(formik.errors.stallion)}
                                style={styles.textInput}


                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="workHoursDay"
                                label="Ile godzin dziennie pracuje koń?"
                                name="workHoursDay"
                                value={formik.values.workHoursDay}
                                onChange={formik.handleChange}
                                error={formik.touched.workHoursDay && Boolean(formik.errors.workHoursDay)}
                                style={styles.textInput}


                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="workDaysWeek"
                                label="Ile dni w tygodniu pracuje koń?"
                                name="workDaysWeek"
                                value={formik.values.workDaysWeek}
                                onChange={formik.handleChange}
                                error={formik.touched.workDaysWeek && Boolean(formik.errors.workDaysWeek)}
                                style={styles.textInput}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="additionalCarousel"
                                label="Dodatkowe korzystanie z karuzeli (min)"
                                name="additionalCarousel"
                                value={formik.values.additionalCarousel}
                                onChange={formik.handleChange}
                                error={formik.touched.additionalCarousel && Boolean(formik.errors.additionalCarousel)}
                                style={styles.textInput}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="nutritionType"
                                label="Typ żywieniowy"
                                name="nutritionType"
                                value={formik.values.nutritionType}
                                onChange={formik.handleChange}
                                error={formik.touched.nutritionType && Boolean(formik.errors.nutritionType)}
                                style={styles.textInput}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="temperament"
                                label="Temperament"
                                name="temperament"
                                value={formik.values.temperament}
                                onChange={formik.handleChange}
                                error={formik.touched.temperament && Boolean(formik.errors.temperament)}
                                style={styles.textInput}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="condition"
                                label="Kondycja (ocena właściciela)"
                                name="condition"
                                value={formik.values.condition}
                                onChange={formik.handleChange}
                                error={formik.touched.condition && Boolean(formik.errors.condition)}
                                style={styles.textInput}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="maintenance"
                                label="Utrzymanie"
                                name="maintenance"
                                value={formik.values.maintenance}
                                onChange={formik.handleChange}
                                error={formik.touched.maintenance && Boolean(formik.errors.maintenance)}
                                style={styles.textInput}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="litter"
                                label="Rodzaj ściółki w boksie"
                                name="litter"
                                value={formik.values.litter}
                                onChange={formik.handleChange}
                                error={formik.touched.litter && Boolean(formik.errors.litter)}
                                style={styles.textInput}

                            />

                        </Box>
                        <Box>
                            <h3>Pasze objętościowe</h3>
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="paddock"
                                label="Koń wychodzi na"
                                name="paddock"
                                autoComplete="stallion"
                                value={formik.values.paddock}
                                onChange={formik.handleChange}
                                error={formik.touched.paddock && Boolean(formik.errors.paddock)}
                                style={styles.textInput}


                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="paddockHours"
                                label="Ile godzin w dniu spędza na pastwisku?"
                                name="paddockHours"
                                value={formik.values.paddockHours}
                                onChange={formik.handleChange}
                                error={formik.touched.paddockHours && Boolean(formik.errors.paddockHours)}
                                style={styles.textInput}


                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="pastureQuality"
                                label="Jakość pastwiska"
                                name="pastureQuality"
                                value={formik.values.pastureQuality}
                                onChange={formik.handleChange}
                                error={formik.touched.pastureQuality && Boolean(formik.errors.pastureQuality)}
                                style={styles.textInput}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="hayAccess"
                                label="Dostęp do siana"
                                name="hayAccess"
                                value={formik.values.hayAccess}
                                onChange={formik.handleChange}
                                error={formik.touched.hayAccess && Boolean(formik.errors.hayAccess)}
                                style={styles.textInput}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="roughage"
                                label="Pasz objętościowa"
                                name="roughage"
                                value={formik.values.roughage}
                                onChange={formik.handleChange}
                                error={formik.touched.roughage && Boolean(formik.errors.roughage)}
                                style={styles.textInput}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="roughageAmount"
                                label="Ilość paszy objętościowej na dzień"
                                name="roughageAmount"
                                value={formik.values.roughageAmount}
                                onChange={formik.handleChange}
                                error={formik.touched.roughageAmount && Boolean(formik.errors.roughageAmount)}
                                style={styles.textInput}

                            />
                            <TextField
                                margin="normal"
                                variant="filled"
                                id="roughageQuality"
                                label="Jakość paszy objętościowej"
                                name="roughageQuality"
                                value={formik.values.roughageQuality}
                                onChange={formik.handleChange}
                                error={formik.touched.roughageQuality && Boolean(formik.errors.roughageQuality)}
                                style={styles.textInput}

                            />

                        </Box>
                    </Box>
                    <Box>
                        <h3>Dawka pokarmowa</h3>
                        {/* <Typography variant="h5" component="h1">Dawka pokarmowa</Typography> */}
                        <FoodDoseTable values={nutrition} rows={rows} setRows={setRows} />
                    </Box>
                    <Box>
                        <h3>Pozostałe informacje</h3>
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="waterAccess"
                            label="Dostęp do wody"
                            name="waterAccess"
                            value={formik.values.waterAccess}
                            onChange={formik.handleChange}
                            error={formik.touched.waterAccess && Boolean(formik.errors.waterAccess)}
                            style={styles.textInput}


                        />
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="hoofCondition"
                            label="Stan kopyt"
                            name="hoofCondition"
                            value={formik.values.hoofCondition}
                            onChange={formik.handleChange}
                            error={formik.touched.hoofCondition && Boolean(formik.errors.hoofCondition)}
                            style={styles.textInput}


                        />
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="allergies"
                            label="Alergie pokarmowe"
                            name="pastureQuality"
                            value={formik.values.pastureQuality}
                            onChange={formik.handleChange}
                            error={formik.touched.pastureQuality && Boolean(formik.errors.pastureQuality)}
                            style={styles.textInput}

                        />
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="foodPreferences"
                            label="PreferencjePokarmowe"
                            name="foodPreferences"
                            value={formik.values.foodPreferences}
                            onChange={formik.handleChange}
                            error={formik.touched.foodPreferences && Boolean(formik.errors.foodPreferences)}
                            style={styles.textInput}

                        />
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="metabolicDiseases"
                            label="Choroby metaboliczne"
                            name="metabolicDiseases"
                            value={formik.values.metabolicDiseases}
                            onChange={formik.handleChange}
                            error={formik.touched.metabolicDiseases && Boolean(formik.errors.metabolicDiseases)}
                            style={styles.textInput}

                        />
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="diseases"
                            label="Kontuzje / inne choroby"
                            name="diseases"
                            value={formik.values.diseases}
                            onChange={formik.handleChange}
                            error={formik.touched.diseases && Boolean(formik.errors.diseases)}
                            style={styles.textInput}

                        />
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="vitamins"
                            label="Niedobory / nadmiary witamin"
                            name="vitamins"
                            value={formik.values.vitamins}
                            onChange={formik.handleChange}
                            error={formik.touched.vitamins && Boolean(formik.errors.vitamins)}
                            style={styles.textInput}

                        />

                    </Box>
                    <Box>
                        <h3>Pozostałe informacje</h3>
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="wantToChange"
                            label="Co chciał(a)bym zmienić?"
                            name="wantToChange"
                            value={formik.values.wantToChange}
                            onChange={formik.handleChange}
                            error={formik.touched.wantToChange && Boolean(formik.errors.wantToChange)}
                            style={styles.textInput}


                        />
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="wantToStay"
                            label="Co chciał(a)bym zostawić w dawce pokarmowej"
                            name="wantToStay"
                            value={formik.values.wantToStay}
                            onChange={formik.handleChange}
                            error={formik.touched.wantToStay && Boolean(formik.errors.wantToStay)}
                            style={styles.textInput}


                        />
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="wetMeals"
                            label="Czy w stajni jest moliwość podawania posiłków na mokro?"
                            name="wetMeals"
                            value={formik.values.wetMeals}
                            onChange={formik.handleChange}
                            error={formik.touched.wetMeals && Boolean(formik.errors.wetMeals)}
                            style={styles.textInput}

                        />
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="moreDoses"
                            label="Czy w stajni jest moliwość podawania posiłków na mokro?"
                            name="moreDoses"
                            value={formik.values.moreDoses}
                            onChange={formik.handleChange}
                            error={formik.touched.moreDoses && Boolean(formik.errors.moreDoses)}
                            style={styles.textInput}

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
    )
}

const styles = {
    userCard: {
        height: '100%',
        width: 'calc(95% + 10px)'
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
        display: 'flex',
        alignItems: 'center',

        justifyContent: 'center',

        padding: 10
    },
    textInput: {
        margin: 5,
        width: 'calc(50% - 10px)'
    }

}
