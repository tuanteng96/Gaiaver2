import axiosClient from "../../../redux/axiosClient";

const LIST_URL = "/api/v6/report?cmd=list";
const SEND_POINT_1_URL = "/api/v6/report?cmd=point1";
const SEND_POINT_2_URL = "/api/v6/report?cmd=point2";
const SEND_COMMENT_URL = "/api/v6/report?cmd=comment";
const CHECKED_URL = "/api/v6/report?cmd=setStatus";

const getList = (data, r_token) => {
    return axiosClient.post(LIST_URL, JSON.stringify(data), { headers: { "r_token": `${r_token}` } })
};

const SendPoint1 = (data) => {
    return axiosClient.post(SEND_POINT_1_URL, JSON.stringify(data))
}

const SendPoint2 = (data) => {
    return axiosClient.post(SEND_POINT_2_URL, JSON.stringify(data))
}

const SendComment = (data) => {
    return axiosClient.post(SEND_COMMENT_URL, JSON.stringify(data))
}

const Checked = (data) => {
    return axiosClient.post(CHECKED_URL, JSON.stringify(data))
}

const PointsCrud = {
    getList,
    SendPoint1,
    SendPoint2,
    SendComment,
    Checked
};

export default PointsCrud;