import axiosClient from "../../../redux/axiosClient";

const CHECK_MACHINE_URL = "/api/v6/user?cmd=machineKey";
const SEND_PERMISSION_URL = "/api/v6/requestonline?cmd=request";
const GET_LESSON_TEACHER_URL = "/api/v3/content2?cmd=teacherLesson";

const checkMachine = (data) => {
    return axiosClient.post(CHECK_MACHINE_URL, JSON.stringify(data));
};

const sendPermission = (data) => {
    return axiosClient.post(SEND_PERMISSION_URL, JSON.stringify(data));
};

const getLessonTeaching = (data, id) => {
    return axiosClient.post(`${GET_LESSON_TEACHER_URL}&mid=${id}`, JSON.stringify(data));
}

///

const TeachingCrud = {
    checkMachine,
    sendPermission,
    getLessonTeaching
};

export default TeachingCrud;