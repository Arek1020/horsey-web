import { SERVER_URL } from '../config'
import Tools from '../utils/Tools'
import { useLocalStorage } from '../utils/Tools'


var User = {
    get: (opts) => {
        if (opts?.refresh) {
            return new Promise((resolve, reject) => {
                fetch(`${SERVER_URL}/user/get`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${User.getToken()}`,
                    },
                    // body: JSON.stringify(opts.payload),
                })
                    .then(Tools.handleResponse)
                    .then(async res => {
                        try {
                           
                            return resolve(res)
                        }
                        catch (err) {
                            console.log(err)
                        }
                    })
            })
        } else {
            let user = JSON.parse(localStorage.getItem('userDetails'))
            if (!user)
                return window.location.pathname = '/login'
            return user
        }
    },
    update: (opts) => {
        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/user/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${User.getToken()}`,
                },
                body: JSON.stringify(opts.payload),
            })
                .then(Tools.handleResponse)
                .then(async res => {
                    try {
                       
                        return resolve(res)
                    }
                    catch (err) {
                        console.log(err)
                    }
                })
        })

    },
    getToken: () => {
        return localStorage.getItem('sessionToken')
    },
    sign: (opts) => {
        // const [user, setUser] = useLocalStorage("userDetails", null);
        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/${opts.isLogin ? 'login' : 'signup'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(opts.payload),
            })
                .then(async res => {
                    try {
                        const jsonRes = await res.json();
                        if (res.err) {
                            return reject(res.message);
                        } else {
                          
                            return resolve(jsonRes)
                        }
                    } catch (err) {
                        console.log(err);
                        return reject();
                    };
                })
                .catch(err => {
                    console.log(err);
                    return reject();
                });
        });
    },
    logOut: () => {
        localStorage.clear();
        window.location.reload();
    },
    changePassword: (data) => {
        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/account/password/change`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${User.getToken()}`,
                },
                body: JSON.stringify(data),
            })
                .then(Tools.handleResponse)
                .then(async res => {
                    try {
                        // const jsonRes = await res.json();
                        if (res.err) {
                            return reject(res.message);
                        } else {

                            localStorage.setItem('userDetails', res?.user)
                            return resolve(res.message)
                        }
                    } catch (err) {
                        console.log(err);
                        return reject();
                    };
                })
                .catch(err => {
                    console.log(err);
                    return reject();
                });
        })

    }
}

export default User;
