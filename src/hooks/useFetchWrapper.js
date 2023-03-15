// import { useRecoilState } from 'recoil';

import { useAuthHeader } from 'react-auth-kit'
import { SERVER_URL } from '../config'

// import { history } from '_helpers';
// import { authAtom } from '_state';

export { useFetchWrapper };

function useFetchWrapper() {
    // const [auth, setAuth] = useRecoilState(authAtom);

    const authHeader = useAuthHeader();

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE'),
        sendFile: sendFile()
    };

    function request(method) {
        return (url, body) => {
            const requestOptions = {
                method,
                // withCredentials: true,
                headers: authHeader(),
                headers: {
                    'Authorization': authHeader(),
                    'Content-Type': 'application/json'
                }
            };
            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
            return fetch(SERVER_URL + url, requestOptions).then(handleResponse);
        }
    }

    function sendFile() {
        return (url, body) => {
            const requestOptions = {
                method: 'POST',
                // withCredentials: true,
                headers: authHeader(),
                headers: {
                    'Authorization': authHeader(),
                    // 'Content-Type': 'form-data'
                }
            };
            if (body) {
                requestOptions.body = body;
            }
            return fetch(SERVER_URL + url, requestOptions)
        }
    }

    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);

            // if (!response.ok) {
            //     if ([401, 403].includes(response.status) && auth?.token) {
            //         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            //         localStorage.removeItem('user');
            //         setAuth(null);
            //         // history.push('/login');
            //     }

            //     const error = (data && data.message) || response.statusText;
            //     return Promise.reject(error);
            // }

            return data;
        });
    }
}
