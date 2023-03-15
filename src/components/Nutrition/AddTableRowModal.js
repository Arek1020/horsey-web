import React, { useState } from 'react'
import {
    Box,
    Card,
    TextField,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    CardActions,
    Button,
    Modal
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { useFormik, useFormikContext } from 'formik';

export default function AddTableRowModal(props) {

    const [visible, setVisible] = useState(false)

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')

    const [errors, setErrors] = useState({ name: false, amount: false })

    const openModal = () => { setVisible(true) }
    const closeModal = () => { setVisible(false) }
    const submitModal = (v) => {
        console.log(v)
        if (!name) return setErrors({ ...errors, name: true })
        else setErrors({ ...errors, name: false })
        if (!amount) return setErrors({ ...errors, amount: true })
        else setErrors({ ...errors, amount: false })

        if (props.handleSubmit)
            props.handleSubmit({ name, amount, id: props.rowId })
        setVisible(false)
        setName('')
        setAmount('')
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: '',

        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log(values);
            if (props.handleSubmit)
                props.handleSubmit({ name: values.name, amount: values.amount, id: props.rowId })
            setVisible(false)
            formik.setFieldValue('name', '')
            formik.setFieldValue('amount', '')



            // const result = await useApi.post('/horse/update', values)
            // alert(result);

        },
    });

    return (
        <Box>
            <Button style={styles.button} onClick={openModal}><AddIcon /></Button>
            <Modal
                open={visible}
                onClose={closeModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box style={styles.modalStyle}>
                    <Typography >Dodaj paszę</Typography>
                    <Box style={styles.modalContent} component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            variant="filled"
                            id="name"
                            label="Nazwa"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            style={styles.textInput}
                            autoFocus={true}
                        />
                        <TextField
                            margin="normal"
                            variant="filled"
                            id="amount"
                            label="Ilość"
                            name="amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            style={styles.textInput}
                        />

                        <Box style={styles.modalFooter}>
                            <Button type="submit">
                                <CheckIcon fontSize={'large'} />
                            </Button>
                        </Box>
                    </Box>

                </Box>

            </Modal>
        </Box>
    )
}

const styles = {
    button: {
        display: 'flex',
        alignSelf: 'center',
        width: '100%',
    },
    container: {
        borderRadius: 10,
        borderColor: '#0000001A',
        borderWidth: 1,
        // padding: 30,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 70
    },
    dot: {
        borderRadius: 100,
        width: 35,
        height: 35
    },
    colorDot: {
        borderRadius: 100,
        width: 40,
        height: 40,
        margin: 10
    },
    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: 20,
        // width: 300,
        // margin: 20,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        textAlign: 'center',
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        width: 300,
    },
    pickerRow: {
        // width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
    modalFooter: {

    },
    inputContainer: {
        width: 330,
        backgroundColor: "#F5F5F5",
        marginTop: 15,
    },
}