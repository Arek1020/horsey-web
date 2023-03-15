import { useState } from "react";
import { Alert } from '@mui/material';

const Tools = {
    showToast: (text) => {

        return (<Alert variant="outlined" severity="success">
            This is a success alert — check it out!
        </Alert>)
    },
    handleResponse: (response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].includes(response.status)) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('userDetails');
                    localStorage.removeItem('sessionToken');
                    window.location.href = '/login'
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return Promise.resolve(data)

        });
    },
    useLocalStorage: (keyName, defaultValue) => {
        const [storedValue, setStoredValue] = useState(() => {
            try {
                const value = window.localStorage.getItem(keyName);
                if (value) {
                    return JSON.parse(value);
                } else {
                    window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                    return defaultValue;
                }
            } catch (err) {
                return defaultValue;
            }
        });
        const setValue = (newValue) => {
            try {
                window.localStorage.setItem(keyName, JSON.stringify(newValue));
            } catch (err) { }
            setStoredValue(newValue);
        };
        return [storedValue, setValue];
    }


    // showError: (text) => {
    //     Toast.show({
    //         render: () => {
    //             return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
    //                 {text}
    //             </Box>;
    //         }
    //     });
    // }
}

export default Tools

