import axiosClient from "../../../redux/axiosClient";

const GET_LIST_URL = "/api/v6/report?cmd=statistic";

const getList = (data, r_token) => {
    return axiosClient.post(GET_LIST_URL, JSON.stringify(data), { headers: { "r_token": `${r_token}` } })
}

const StatisticalCrud = {
    getList
};

export default StatisticalCrud;