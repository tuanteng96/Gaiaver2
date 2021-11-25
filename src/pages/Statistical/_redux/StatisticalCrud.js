import axiosClient from "../../../redux/axiosClient";

const GET_LIST_URL = "/api/v6/report?cmd=statistic";

const getList = (data) => {
    return axiosClient.post(GET_LIST_URL, JSON.stringify(data))
}

const StatisticalCrud = {
    getList
};

export default StatisticalCrud;