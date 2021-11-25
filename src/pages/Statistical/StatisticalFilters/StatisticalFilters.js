import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import Select from "react-select";

import DateTimePicker from "../../../_shared/DateTimePicker/DateTimePicker";
import PointsCrud from "../../Points/_redux/PointsCrud";

import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

StatisticalFilters.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

function StatisticalFilters({ initialValues, onSubmit, loading }) {
  const [loadingFech, setLoadingFech] = useState({
    mission: false,
    taskGroup: false,
  });
  const [listMission, setListMission] = useState([]);
  const [listTaskGroup, setListTaskGroup] = useState([]);

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

  const getTaskGroup = async () => {
    setLoadingFech((prev) => ({ ...prev, taskGroup: true }));
    try {
      const { data } = await PointsCrud.getTaskGroup({});
      const newData = data.map((item) => ({
        ...item,
        label: item.Title,
        value: item.ID,
      }));
      setListTaskGroup(newData);
      setLoadingFech((prev) => ({ ...prev, taskGroup: false }));
    } catch (error) {
      console.log(error);
      setLoadingFech((prev) => ({ ...prev, taskGroup: false }));
    }
  };

  useEffect(() => {
    getMission();
    getTaskGroup();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formikProps) => {
        const { values, setFieldValue } = formikProps;
        return (
          <Form>
            <div className="d-flex flex-wrap align-items-end">
              <div className="w-250px mr-5 mb-0">
                <div className="form-group">
                  <label className="mb-1">Nhóm nhiệm vụ</label>
                  <Select
                    className="select-control"
                    classNamePrefix="select"
                    isDisabled={loadingFech.taskGroup}
                    isLoading={loadingFech.taskGroup}
                    isClearable={true}
                    name="TaskGroupID"
                    options={listTaskGroup}
                    placeholder="Chọn nhóm nhiệm vụ"
                    onChange={(otp) => {
                      setFieldValue("TaskGroupID", otp && otp.ID);
                    }}
                    value={
                      listTaskGroup
                        ? listTaskGroup.filter(
                            (item) => item.ID === values.TaskGroupID
                          )
                        : []
                    }
                  />
                </div>
              </div>
              <div className="w-250px mr-5 mb-0">
                <div className="form-group">
                  <label className="mb-1">Nhiêm vụ</label>
                  <Select
                    isMulti
                    className="select-control"
                    classNamePrefix="select"
                    isDisabled={loadingFech.mission}
                    isLoading={loadingFech.mission}
                    isClearable={true}
                    name="TaskIDs"
                    options={listMission}
                    placeholder="Chọn nhiệm vụ"
                    onChange={(otp) => {
                      setFieldValue("TaskIDs", otp ? otp : []);
                    }}
                    value={values.TaskIDs}
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
              <div>
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
                  <button
                    type="button"
                    className={`btn btn-success w-auto ml-2 ${
                      loading
                        ? "spinner spinner-white spinner-right disabled"
                        : ""
                    }`}
                  >
                    <i className="fal fa-file-csv"></i>
                    Xuất Excel
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

export default StatisticalFilters;
