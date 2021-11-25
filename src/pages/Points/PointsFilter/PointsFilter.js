import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import Select from "react-select";
import DateTimePicker from "../../../_shared/DateTimePicker/DateTimePicker";
import PointsCrud from "./../_redux/PointsCrud";

import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

PointsFilter.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

const ListMethod = [
  { value: "moi_nhat", label: "Mới nhất" },
  { value: "tat_ca", label: "Tất cả" },
];

const ListStatus = [
  { value: "chua_cham", label: "Chưa chấm" },
  { value: "da_cham_1", label: "Chấm lần 1" },
  { value: "da_cham_2", label: "Chấm lần 2" },
  { value: "da_duyet", label: "Đã duyệt" },
];

function PointsFilter({ onSubmit, initialValues, loading }) {
  const [loadingFech, setLoadingFech] = useState({
    mission: false,
    teacher: false,
  });

  const [listMission, setListMission] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);

  const getMission = async () => {
    setLoadingFech((prev) => ({ ...prev, mission: true }));
    try {
      const { data } = await PointsCrud.getTaskMisson({});
      const newData = data.map((item) => ({
        ...item,
        label: item.Title,
        value: item.ID,
      }));
      setListMission(newData);
      setLoadingFech((prev) => ({ ...prev, mission: false }));
    } catch (error) {
      console.log(error);
      setLoadingFech((prev) => ({ ...prev, mission: false }));
    }
  };

  const getTeacher = async () => {
    setLoadingFech((prev) => ({ ...prev, teacher: true }));
    try {
      const { data } = await PointsCrud.getTeacher({});
      const newData = data.map((item) => ({
        ...item,
        label: item.FullName,
        value: item.ID,
      }));
      setListTeacher(newData);
      setLoadingFech((prev) => ({ ...prev, teacher: false }));
    } catch (error) {
      console.log(error);
      setLoadingFech((prev) => ({ ...prev, teacher: false }));
    }
  };

  useEffect(() => {
    getMission();
    getTeacher();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formikProps) => {
        const { values, handleBlur, setFieldValue } = formikProps;
        return (
          <Form>
            <div className="d-flex align-items-end flex-wrap">
              <div className="w-250px mr-5 mb-0">
                <div className="form-group">
                  <label className="mb-1">Nhiệm vụ</label>
                  <Select
                    className="select-control"
                    classNamePrefix="select"
                    isDisabled={loadingFech.mission}
                    isLoading={loadingFech.mission}
                    isClearable={true}
                    name="TaskID"
                    options={listMission}
                    placeholder="Chọn nhiệm vụ"
                    onChange={(otp) => {
                      setFieldValue("TaskID", otp && otp.ID);
                    }}
                    value={
                      listMission
                        ? listMission.filter(
                            (item) => item.ID === values.TaskID
                          )
                        : []
                    }
                  />
                </div>
              </div>
              <div className="w-250px mr-5 mb-0">
                <div className="form-group">
                  <label className="mb-1">Giáo viên</label>
                  <Select
                    className="select-control"
                    classNamePrefix="select"
                    isDisabled={loadingFech.teacher}
                    isLoading={loadingFech.teacher}
                    isClearable={true}
                    name="UserID"
                    options={listTeacher}
                    placeholder="Chọn Giáo viên"
                    onChange={(otp) => {
                      setFieldValue("UserID", otp && otp.ID);
                    }}
                    value={
                      listTeacher
                        ? listTeacher.filter(
                            (item) => item.ID === values.UserID
                          )
                        : []
                    }
                  />
                </div>
              </div>
              <div className="w-200px mr-5 mb-0">
                <div className="form-group">
                  <label className="mb-1">Từ ngày</label>
                  <DateTimePicker
                    name="From"
                    className="form-control"
                    popperProps={{
                      positionFixed: true,
                    }}
                    selected={values.From && new Date(values.From)}
                    shouldCloseOnSelect={false}
                    onBlur={(event) => {
                      if (event.target.value.length < 1) {
                      }
                    }}
                    placeholderText="Bắt đầu"
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                      setFieldValue("From", date);
                    }}
                  />
                </div>
              </div>
              <div className="w-200px w-250px mr-5 mb-0">
                <div className="form-group">
                  <label className="mb-1">Đến ngày</label>
                  <DateTimePicker
                    name="To"
                    className="form-control"
                    popperProps={{
                      positionFixed: true,
                    }}
                    selected={values.To && new Date(values.To)}
                    shouldCloseOnSelect={false}
                    onBlur={(event) => {
                      if (event.target.value.length < 1) {
                      }
                    }}
                    placeholderText="Kết thúc"
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                      setFieldValue("To", date);
                    }}
                  />
                </div>
              </div>
              <div className="w-200px mr-5 mb-0">
                <div className="form-group">
                  <label className="mb-1">Trạng thái</label>
                  <Select
                    className="select-control"
                    classNamePrefix="select"
                    name="Method"
                    options={ListMethod}
                    placeholder="Chọn Trạng thái"
                    onChange={(otp) => {
                      setFieldValue("Method", otp ? otp.value : "");
                    }}
                    value={ListMethod.filter(
                      (item) => item.value === values.Method
                    )}
                    onBlur={handleBlur}
                    isClearable={true}
                  />
                </div>
              </div>
              <div className="w-200px mr-5 mb-0">
                <div className="form-group">
                  <label className="mb-1">Tình trạng</label>
                  <Select
                    className="select-control"
                    classNamePrefix="select"
                    name="Status"
                    options={ListStatus}
                    placeholder="Chọn Trạng thái"
                    onChange={(otp) => {
                      setFieldValue("Status", otp ? otp.value : "");
                    }}
                    value={ListStatus.filter(
                      (item) => item.value === values.Status
                    )}
                    onBlur={handleBlur}
                    isClearable={true}
                  />
                </div>
              </div>
              <div className="w-250px">
                <div className="form-group">
                  <button
                    type="submit"
                    className={`btn btn-primary w-auto ${
                      loading
                        ? "spinner spinner-white spinner-right disabled"
                        : ""
                    }`}
                  >
                    <i className="fal fa-search mr-1"></i>
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PointsFilter;
