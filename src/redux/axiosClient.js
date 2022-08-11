import axios from 'axios';
import queryString from 'query-string';
import { DevHelpers } from '../_ezs/_helpers/DevHelpers';

const axiosClient = axios.create({
    baseURL: DevHelpers.isDevelopment() ? process.env.REACT_APP_API_URL : '',
    // headers: {
    //     'content-type': 'text/plain',
    //     "Set-Cookie": "promo_shown=1; SameSite=Lax"
    // },
    paramsSerializer: params => queryString.stringify(params),
});

export default axiosClient;