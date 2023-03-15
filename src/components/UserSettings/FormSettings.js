import React, { useEffect, useState } from 'react';
// import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import ImageUpload from "./ImageUpload";
// import User from '../../scripts/User';
import DialogChangePassword from './DialogChangePassword';
import { useFetchWrapper } from '../../hooks/useFetchWrapper'
import { useAuthHeader } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit'
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, TextField } from "@mui/material";
import * as yup from "yup";





function AddressForm() {
    const useApi = useFetchWrapper()

    const authHeader = useAuthHeader();
    const user = useAuthUser();
    const userDetails = JSON.parse(localStorage.getItem('user') || '{}')

    const initialValues = {
        email: userDetails?.email,
        name: userDetails?.name,
        surname: userDetails?.surname
    }

    const [formValues, setFormValues] = useState(initialValues);

   
    // useEffect(async () => {
    
    // }, [])


    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        useApi.post('/user/update', values)
    };

    return (
        // <React.Fragment>
        <Box>
            <Typography variant="h6" gutterBottom>
                Dane użytkownika
            </Typography>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={formValues}
                // validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Imie"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nazwisko"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.surname}
                                name="surname"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Numer telefonu"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                name="phone"
                                error={!!touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2" }}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            {/* <DialogChangePassword /> */}
                            <Button style={{ marginTop: '10px', marginLeft: '10px' }} type="submit" variant="contained">
                                Zapisz
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
        // </React.Fragment>
    );
}

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
});

export default AddressForm