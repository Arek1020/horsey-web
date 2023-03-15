// import {createRefresh} from 'react-auth-kit'
// import { useFetchWrapper } from './hooks/useFetchWrapper';

// const useApi = useFetchWrapper();

// const refreshApi = createRefresh({
//     interval: 10,
//     refreshApiCallback: 
//     async ({   // arguments
//             authToken,
//             authTokenExpireAt,
//             refreshToken,
//             refreshTokenExpiresAt,
//             authUserState
//         }) => {
//             let user = await useApi.post('/user/get', { id: authUserState?.id })
//             return {
//                 isSuccess: true,
//                 newAuthUserState: user
//             }
//          }
// })


// export default refreshApi;