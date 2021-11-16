import axiosClient from "../redux/axiosClient";
const GET_ALL_URL = "/api/v1";

const getAll = (data) => {
    return axiosClient.post(GET_ALL_URL, JSON.stringify(data));
}

const TeachingApi = {
    getAll
}
export default TeachingApi;