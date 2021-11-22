import axiosClient from "../../../redux/axiosClient";

const LIST_URL = "/api/v6/report?cmd=list";

const getList = (data, r_token) => {
    return axiosClient.post(LIST_URL, JSON.stringify(data), { Authorization: `Bearer ${r_token}` });
};
///

const PointsCrud = {
    getList
};

export default PointsCrud;