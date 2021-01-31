import axios from 'axios';

const setAuthToken = (token: any) => {
    if (token) {
        // eslint-disable-next-line dot-notation
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // eslint-disable-next-line dot-notation
        axios.defaults.headers.common['Authorization'] = null;
    }
};

// const setAuthToken = (token: any) => {
//     axios.interceptors.request.use(
//         (config) => {
//             config.headers.authorization = `Bearer ${token}`;
//             return config;
//         },
//         (err) => {
//             return Promise.reject(err);
//         }
//     );
// };

export default setAuthToken;
