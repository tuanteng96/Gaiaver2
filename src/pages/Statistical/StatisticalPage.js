import React, { useState, useEffect } from "react";
import LoaderTable from "../../layout/components/Loaders/LoaderTable";
import { isDev } from "../../_ezs/_helpers/AssetsHelpers";
import { getRequestParams } from "../../_ezs/_helpers/RequestHelpers";
import TheadTd from "./theadTd/TheadTd";
import StatisticalFilters from "./StatisticalFilters/StatisticalFilters";
import Swal from "sweetalert2";

import moment from "moment";
import "moment/locale/vi";
import StatisticalCrud from "./_redux/StatisticalCrud";
import { useDispatch, useSelector } from "react-redux";
import { setPermission } from "./_redux/StatisticalSlice";
import { useWindowSize } from "../../hook/useResize";
moment.locale("vi");

const showErrorPermiss = () => {
  Swal.fire({
    title: "Truy cập bị cấm",
    html: `<div class="p-1">
        <div class="mb-3">
          Bạn không có quyền truy cập chức năng Thống kê.
        </div>
      </div>`,
    icon: "error",
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: "Đóng",
    buttonsStyling: false,
    allowOutsideClick: false,
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
  }).then(() => {
    window.location.href = "/";
  });
};

function StatisticalPage(props) {
  const { Permission, R_Token } = useSelector((state) => state.statistical);
  const [listStatis, setListStatis] = useState({ Tasks: {}, List: [] });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    filter2: {
      Key: "",
      Method: "moi_nhat",
      TaskGroupID: "",
      TaskIDs: [],
      From: "",
      To: "",
    },
    Pi: 1,
    Ps: 10,
  });
  const [elmHead, setElmHead] = useState(0);

  const { width } = useWindowSize();

  const dispatch = useDispatch();

  const retrieveStatistical = () => {
    !loading && setLoading(true);
    const params = getRequestParams(filters);

    StatisticalCrud.getList(params, R_Token)
      .then(({ data, error }) => {
        if (error) {
          showErrorPermiss();
        }
        else {
          let newTasks =
            data && data.length > 0 ? data.filter((item) => !item.User) : null;
          if (newTasks && newTasks.length > 0) newTasks = newTasks[0].Tasks;
          else {
            newTasks = {};
          }
          const newList =
            data && data.length > 0 ? data.filter((item) => item.User) : [];

          setListStatis((prev) => ({
            ...prev,
            Tasks: newTasks,
            List: newList,
            Current:
              data &&
              data.filter((item) => item.Tasks && item.Tasks.length > 0),
          }));
          setLoading(false);
          dispatch(setPermission({}));
        }
      })
      .catch((error) => {
        dispatch(setPermission(null));
        setLoading(false);
      });
  };

  useEffect(() => {
    retrieveStatistical();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (Permission === null) {
      showErrorPermiss();
    }
  }, [Permission]);

  const updateElmHead = (height) => {
    setElmHead(height);
  };

  const submitFilters = (values) => {
    const newValues = {
      ...values,
      From: values.From && moment(values.From).format("YYYY-MM-DD"),
      To: values.To && moment(values.To).format("YYYY-MM-DD"),
    };
    setFilters((prev) => ({ ...prev, filter2: newValues }));
  };

  const checkStatusPoint = (status) => {
    if (status === "DA_NOP") return "bg-success";
    if (status === "DA_CHAM") return "bg-primary";
    if (status === "CHUA_NOP") return "bg-danger";
    return "";
  };

  return (
    <div className={`container-fluid ${!isDev() ? "p-0" : ""}`}>
      <div className="hpanel">
        <div className="panel-body">
          <div className="d-flex">
            <h2 className="font-light m-b-xs tb-head-title">Thống kê</h2>
          </div>
        </div>
      </div>
      <div className="hpanel hgreen">
        <div className="panel-heading hbuilt">Danh sách</div>
        <div className="panel-body overflow-revert">
          <StatisticalFilters
            loading={loading}
            initialValues={filters.filter2}
            onSubmit={submitFilters}
          />
          {loading && <LoaderTable text="Đang tải thống kê ..." />}
          {!loading && (
            <React.Fragment>
              {listStatis.Current && listStatis.Current.length > 0 ? (
                <React.Fragment>
                  {width > 767 && (
                    <div className="d-flex align-items-stretch">
                      <div className="w-425px">
                        <table className="table table-bordered mb-0">
                          <thead>
                            <tr
                              style={{
                                height: `${elmHead}px`,
                              }}
                            >
                              <th
                                className="text-center vertical-align-middle"
                                colSpan={4}
                              >
                                Giáo viên
                              </th>
                            </tr>
                            <tr className="bg-gray-100">
                              <th>Mã</th>
                              <th>Tên giáo viên</th>
                              <th className="text-center">TĐ</th>
                              <th className="text-center border-right-0">TB</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listStatis &&
                              listStatis.List &&
                              listStatis.List.length > 0 &&
                              listStatis.List.map((teacher, index) => (
                                <tr key={index}>
                                  <td>{teacher.User && teacher.User.Code}</td>
                                  <td>
                                    {teacher.User && teacher.User.FullName}
                                  </td>
                                  <td className="text-center">
                                    {teacher.tong && teacher.tong}
                                  </td>
                                  <td className="text-center">
                                    {teacher.tb && teacher.tb}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex-1">
                        <div className="react-bootstrap-table table-responsive style-scrollbar pb-2">
                          <table className="table table-bordered mb-0 border-left-0">
                            <thead>
                              <tr>
                                {listStatis &&
                                  listStatis.Tasks &&
                                  listStatis.Tasks.length > 0 &&
                                  listStatis.Tasks.map((task, index) => (
                                    <TheadTd
                                      key={index}
                                      index={index}
                                      item={task}
                                      updateElmHead={updateElmHead}
                                    />
                                  ))}
                              </tr>
                              <tr className="bg-gray-100">
                                {listStatis &&
                                  listStatis.Tasks &&
                                  listStatis.Tasks.length > 0 &&
                                  listStatis.Tasks.map((task, index) => (
                                    <React.Fragment key={index}>
                                      <th
                                        className={`text-center ${
                                          index === 0 && "border-left-0"
                                        }`}
                                      >
                                        SL :
                                        <span className="pl-1">
                                          {task &&
                                          task.Value &&
                                          task.Value.tong_so
                                            ? task.Value.tong_so
                                            : 0}
                                        </span>
                                      </th>
                                      <th className="text-center">
                                        Nộp :
                                        <span className="pl-1">
                                          {task &&
                                          task.Value &&
                                          task.Value.da_nop
                                            ? task.Value.da_nop
                                            : 0}
                                        </span>
                                      </th>
                                      <th className="text-center">
                                        Chấm :
                                        <span className="pl-1">
                                          {task &&
                                          task.Value &&
                                          task.Value.da_cham
                                            ? task.Value.da_cham
                                            : 0}
                                        </span>
                                      </th>
                                    </React.Fragment>
                                  ))}
                              </tr>
                            </thead>
                            <tbody>
                              {listStatis &&
                                listStatis.List &&
                                listStatis.List.length > 0 &&
                                listStatis.List.map((teacher, index) => (
                                  <tr key={index}>
                                    {teacher.Tasks &&
                                      teacher.Tasks.map((item, index) => (
                                        <React.Fragment key={index}>
                                          <td
                                            key={index}
                                            colSpan={3}
                                            className={`text-center ${checkStatusPoint(
                                              item.Value.trang_thai
                                            )} ${
                                              index === 0 && "border-left-0"
                                            }`}
                                          >
                                            {item.Value && item.Value.diem ? (
                                              <span className="text-white font-weight-bold">
                                                {item.Value.diem}
                                              </span>
                                            ) : (
                                              <div className="opacity-0">
                                                {item.Task.ID}
                                              </div>
                                            )}
                                          </td>
                                        </React.Fragment>
                                      ))}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  {width < 767 && (
                    <div className="react-bootstrap-table table-responsive style-scrollbar pb-2">
                      <table className="table table-bordered mb-0">
                        <thead>
                          <tr>
                            <th
                              className="text-center vertical-align-middle min-w-400px"
                              colSpan={4}
                            >
                              Giáo viên
                            </th>
                            {listStatis &&
                              listStatis.Tasks &&
                              listStatis.Tasks.length > 0 &&
                              listStatis.Tasks.map((task, index) => (
                                <TheadTd
                                  key={index}
                                  index={index}
                                  item={task}
                                  updateElmHead={updateElmHead}
                                />
                              ))}
                          </tr>
                          <tr className="bg-gray-100">
                            <th>Mã</th>
                            <th>Tên giáo viên</th>
                            <th className="text-center">TĐ</th>
                            <th className="text-center">TB</th>
                            {listStatis &&
                              listStatis.Tasks &&
                              listStatis.Tasks.length > 0 &&
                              listStatis.Tasks.map((task, index) => (
                                <React.Fragment key={index}>
                                  <th className={`text-center`}>
                                    SL :
                                    <span className="pl-1">
                                      {task && task.Value && task.Value.tong_so
                                        ? task.Value.tong_so
                                        : 0}
                                    </span>
                                  </th>
                                  <th className="text-center">
                                    Nộp :
                                    <span className="pl-1">
                                      {task && task.Value && task.Value.da_nop
                                        ? task.Value.da_nop
                                        : 0}
                                    </span>
                                  </th>
                                  <th className="text-center">
                                    Chấm :
                                    <span className="pl-1">
                                      {task && task.Value && task.Value.da_cham
                                        ? task.Value.da_cham
                                        : 0}
                                    </span>
                                  </th>
                                </React.Fragment>
                              ))}
                          </tr>
                        </thead>
                        <tbody>
                          {listStatis &&
                            listStatis.List &&
                            listStatis.List.length > 0 &&
                            listStatis.List.map((teacher, index) => (
                              <tr key={index}>
                                <td>{teacher.User && teacher.User.Code}</td>
                                <td>{teacher.User && teacher.User.FullName}</td>
                                <td className="text-center">
                                  {teacher.tong && teacher.tong}
                                </td>
                                <td className="text-center">
                                  {teacher.tb && teacher.tb}
                                </td>
                                {teacher.Tasks &&
                                  teacher.Tasks.map((item, index) => (
                                    <React.Fragment key={index}>
                                      <td
                                        key={index}
                                        colSpan={3}
                                        className={`text-center ${checkStatusPoint(
                                          item.Value.trang_thai
                                        )} ${index === 0 && "border-left-0"}`}
                                      >
                                        {item.Value && item.Value.diem ? (
                                          <span className="text-white font-weight-bold">
                                            {item.Value.diem}
                                          </span>
                                        ) : (
                                          <div className="opacity-0">
                                            {item.Task.ID}
                                          </div>
                                        )}
                                      </td>
                                    </React.Fragment>
                                  ))}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                <div className="border p-8 min-h-250px font-size-md rounded d-flex align-items-center justify-content-center">
                  Không có dữ liệu
                </div>
              )}
            </React.Fragment>
          )}
        </div>
        <div className="panel-footer d-flex justify-content-center justify-content-md-between align-items-center flex-column flex-md-row bg-white py-5">
          <div className="line-height-md mb-3 mb-md-0">
            <span>
              <b className="font-weight-boldest">TĐ</b> : Tổng điểm
            </span>
            <span className="pl-5">
              <b className="font-weight-boldest">TB</b> : Trung bình
            </span>
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center">
              <div className="w-12px h-12px border rounded-circle"></div>
              <div className="ml-2 line-height-md">Không được giao</div>
            </div>
            <div className="d-flex align-items-center ml-8">
              <div className="w-12px h-12px border border-danger bg-danger rounded-circle"></div>
              <div className="ml-2 line-height-md">Được giao chưa nộp</div>
            </div>
            <div className="d-flex align-items-center ml-8">
              <div className="w-12px h-12px border border-success bg-success rounded-circle"></div>
              <div className="ml-2 line-height-md">Đã nộp</div>
            </div>
            <div className="d-flex align-items-center ml-8">
              <div className="w-12px h-12px border border-primary bg-primary rounded-circle"></div>
              <div className="ml-2 line-height-md">Đã chấm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticalPage;
