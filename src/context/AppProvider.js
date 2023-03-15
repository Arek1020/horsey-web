import { createContext, useState } from "react";
import { useFetchWrapper } from '../hooks/useFetchWrapper';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [userInfo, setUserInfo] = useState(null)

    const useApi = useFetchWrapper();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem('user')))
    }, [])


    const reloadUserInfo = async () => {
        let user = await useApi.post('/user/get', { id: userInfo?.id })
        setUserInfo(user)
        localStorage.setItem('user', user)
        // Use.get({ id: userInfo?.id }, userToken).then((user) => {
        //     Storage.set('userInfo', user[0]);
        //     setUserInfo(user[0])
        // })
    }

    

return (
    <AuthContext.Provider value={{ auth, setAuth, reloadUserInfo }}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthContext;