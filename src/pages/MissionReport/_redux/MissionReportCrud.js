import axiosClient from "../../../redux/axiosClient";

const GET_LIST_MISSION_URL = "/api/v6/task?cmd=taskList";

const getListMissionRp = (data) => {
  return axiosClient.post(GET_LIST_MISSION_URL, JSON.stringify(data));
};

///

const MissionReportCrud = {
  getListMissionRp,
};

export default MissionReportCrud;
