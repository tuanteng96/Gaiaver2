import axiosClient from "../../../redux/axiosClient";

const CHECK_MACHINE_URL = "/api/v6/user?cmd=machineKey";
const SEND_PERMISSION_URL = "/api/v6/requestonline?cmd=request";

const checkMachine = (data) => {
  return axiosClient.post(CHECK_MACHINE_URL, JSON.stringify(data));
};

const sendPermission = (data) => {
  return axiosClient.post(SEND_PERMISSION_URL, JSON.stringify(data));
};

///

const TeachingCrud = {
  checkMachine,
  sendPermission,
};

export default TeachingCrud;
