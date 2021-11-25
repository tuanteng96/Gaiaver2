import axiosClient from "../../../redux/axiosClient";

const LIST_URL = "/api/v6/report?cmd=list";
const SEND_POINT_1_URL = "/api/v6/report?cmd=point1";
const SEND_POINT_2_URL = "/api/v6/report?cmd=point2";
const SEND_COMMENT_URL = "/api/v6/report?cmd=comment";
const CHECKED_URL = "/api/v6/report?cmd=setStatus";
const TASK_MISSON_URL = "/api/v6/task?cmd=taskSelect";
const LIST_TEACHER_URL = "/api/v6/users?cmd=userSelect";
const LIST_TASK_GROUP_URL = "/api/v6/taskgroup?cmd=taskGroupSelect";

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
const getTaskMisson = (data) => {
    return axiosClient.post(TASK_MISSON_URL, JSON.stringify(data))
}
const getTeacher = (data) => {
    return axiosClient.post(LIST_TEACHER_URL, JSON.stringify(data))
}
const getTaskGroup = (data) => {
    return axiosClient.post(LIST_TASK_GROUP_URL, JSON.stringify(data))
}

const PointsCrud = {
    getList,
    SendPoint1,
    SendPoint2,
    SendComment,
    Checked,
    getTaskMisson,
    getTeacher,
    getTaskGroup
};

export default PointsCrud;