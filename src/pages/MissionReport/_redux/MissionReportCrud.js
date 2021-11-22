import axiosClient from "../../../redux/axiosClient";

const GET_LIST_MISSION_URL = "/api/v6/task?cmd=taskList";
const POST_RP_MISSION_URL = "/api/v6/report?cmd=add";

const getListMissionRp = (data) => {
    return axiosClient.post(GET_LIST_MISSION_URL, JSON.stringify(data));
};
const sendMissionRp = (data) => {
    return axiosClient.post(POST_RP_MISSION_URL, JSON.stringify(data));
}

///

const MissionReportCrud = {
    getListMissionRp,
    sendMissionRp
};

export default MissionReportCrud;