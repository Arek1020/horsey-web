import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import User from '../scripts/User';
import Tools from '../utils/Tools';
// import useAuth from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
// import iconBlue from './'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
            Horsey
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {
    // const { setAuth } = useAuth();
    const signIn = useSignIn()
    const isAuthenticated = useIsAuthenticated()


    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (isAuthenticated()) { //jezeli jest zalogowany to przekireuje na start
            navigate({ pathname: '/' }, { replace: true });
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        var payload = {
            email: data.get('email'),
            password: data.get('password'),
            adminPanel: 1,
        }
        User.sign({ isLogin: true, payload }).then((response) => {
            if (response.err) {
                setAlertContent(response.message);
                return setAlert(true);
            }
            if (signIn(
                {
                    token: response.token,
                    expiresIn: 3600,
                    tokenType: "EquineAdvisor",
                    authState: JSON.parse(response.user),
                    // refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                    // refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                }
            )) {
                setAlert(false);
                localStorage.setItem('user', response.user)
                navigate(from, { replace: true });
            } else {
                setAlertContent('Błąd logowania');
                setAlert(true);
            }
            // setAuth({ user: JSON.parse(response.user), token: response.token });

        }).catch((response) => {
            console.log(response)

            setAlertContent(response);
            setAlert(true);
        })
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        // backgroundImage: 'url(https://source.unsplash.com/random)',
                        // backgroundRepeat: 'no-repeat',
                        // backgroundColor: (t) =>
                        //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundColor: 'white',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <img
                        src={require('./iconBlue.png')}
                        // src={`../public/logoBlue.png?w=164&h=164&fit=crop&auto=format`}
                        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        // alt={item.title}
                        width={250}
                        style={{ borderRadius: 10 }}
                        loading="lazy"
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Zaloguj się
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email / Login"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Hasło"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            {alert ? <Alert severity='error'>{alertContent}</Alert> : <></>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    Tools.showToast()
                                }}
                            >
                                Zaloguj się
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/* <Link href="/password/change" variant="body2">
                                        Zapomniałeś/aś hasła?
                                    </Link> */}
                                </Grid>
                                <Grid item>
                                    {/* <Link href="/register" variant="body2">
                                        {"Nie masz konta? Zarejestruj się."}
                                    </Link> */}
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}