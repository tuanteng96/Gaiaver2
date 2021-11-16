export default function setupAxios(axios) {

    // Request interceptor for API calls
    axios.interceptors.request.use(
        config => {
            // const {
            //     auth: { authToken }
            // } = store.getState();
            const authToken = window.Token || "";
            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }

            return config;
        },
        err => Promise.reject(err)
    );

    // Response interceptor for API calls
    axios.interceptors.response.use((response) => {

        if (response && response.data) {
            if (response.config.responseType && response.config.responseType === "blob") {
                return {
                    data: response.data,
                    headers: response.headers
                }
            }
            return response.data;
        }

        return response;
    }, (error) => {
        // Check Error Token
        return Promise.reject(error);
    });
}