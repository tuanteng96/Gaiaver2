import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import FormPoint1 from "./FormPoint1/FormPoint1";

import moment from "moment";
import "moment/locale/vi";
import { useSelector } from "react-redux";
import FormPoint2 from "./FormPoint2/FormPoint2";
import FormComment from "./FormComment/FormComment";

moment.locale("vi");

ModalPoint.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  defaultValue: PropTypes.object,
  onSubmitPoint1: PropTypes.func,
  onSubmitPoint2: PropTypes.func,
  onSubmitComment: PropTypes.func,
  PointChecked: PropTypes.func,
};

function ModalPoint({
  show,
  onHide,
  defaultValue,
  onSubmitPoint1,
  onSubmitPoint2,
  onSubmitComment,
  PointChecked,
}) {
  const { AdvPremiss, LoadingBtn } = useSelector(({ point }) => ({
    AdvPremiss: point.Permission && point.Permission.nang_cao,
    LoadingBtn: point.LoadingBtn,
  }));

  if (!defaultValue) return "";
  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header className="open-close" closeButton>
        <Modal.Title>
          {defaultValue.Task && defaultValue.Task.Title
            ? defaultValue.Task.Title
            : "Chưa nhập tên"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="container px-4">
          <div className="row">
            <div className="col-md-4">
              <div className="py-8 px-3">
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  Chấm lần 1
                </h3>
                <FormPoint1
                  defaultValue={defaultValue}
                  onSubmit={onSubmitPoint1}
                />
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  Lịch sử chấm lần 1
                </h3>
                <div>
                  {defaultValue.Point1List &&
                  defaultValue.Point1List.length > 0 ? (
                    <React.Fragment>
                      {defaultValue.Point1List.map((item, index) => (
                        <div
                          className={`bg-gray-100 p-4 rounded ${
                            defaultValue.Point1List.length - 1 !== index &&
                            "mb-3"
                          }`}
                          key={index}
                        >
                          <div className="mb-3 d-flex justify-content-between align-items-center">
                            <div>
                              <div className="text-dark-75 font-weight-boldest">
                                <span className="text-uppercase pr-1">
                                  [{item.User && item.User.Code}]
                                </span>
                                {item.User && item.User.FullName}
                              </div>
                              <div className="text-muted">
                                {moment(item.Date).format("HH:mm DD/MM/YYYY")}
                              </div>
                            </div>
                            <div>
                              <button className="btn btn-sm btn-outline-gaia btn-shadow font-weight-boldest font-size-md h-35px">
                                {item.Point}
                              </button>
                              {AdvPremiss && (
                                <button
                                  className={`btn btn-sm font-weight-bold h-35px ml-2 ${
                                    item.Status === "done"
                                      ? "btn-primary"
                                      : "btn-success"
                                  }`}
                                  onClick={() =>
                                    PointChecked(
                                      item,
                                      "Point1",
                                      defaultValue.ID,
                                      defaultValue
                                    )
                                  }
                                >
                                  {LoadingBtn.Checked &&
                                  LoadingBtn.Checked?.Point === 1 &&
                                  LoadingBtn.Checked?.Index === item.Index ? (
                                    <div className="spinner spinner-white w-20px"></div>
                                  ) : (
                                    <span>
                                      {item.Status === "done"
                                        ? "Đã duyệt"
                                        : "Duyệt"}
                                    </span>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                          <div>{item.Desc}</div>
                        </div>
                      ))}
                    </React.Fragment>
                  ) : (
                    "Chưa chấm"
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4 border-left border-right">
              <div className="py-8 px-3">
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  Quản lý chấm
                </h3>
                <FormPoint2
                  defaultValue={defaultValue}
                  onSubmit={onSubmitPoint2}
                />
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  Lịch sử chấm lần 2
                </h3>
                <div>
                  {defaultValue.Point2List &&
                  defaultValue.Point2List.length > 0 ? (
                    <React.Fragment>
                      {defaultValue.Point2List.map((item, index) => (
                        <div
                          className={`bg-gray-100 p-4 rounded ${
                            defaultValue.Point2List.length - 1 !== index &&
                            "mb-3"
                          }`}
                          key={index}
                        >
                          <div className="mb-3 d-flex justify-content-between align-items-center">
                            <div>
                              <div className="text-dark-75 font-weight-boldest">
                                <span className="text-uppercase pr-1">
                                  [{item.User && item.User.Code}]
                                </span>
                                {item.User && item.User.FullName}
                              </div>
                              <div className="text-muted">
                                {moment(item.Date).format("HH:mm DD/MM/YYYY")}
                              </div>
                            </div>
                            <div>
                              <button className="btn btn-sm btn-outline-gaia btn-shadow font-weight-boldest font-size-md h-35px">
                                {item.Point}
                              </button>
                              {AdvPremiss && (
                                <button
                                  className={`btn btn-sm font-weight-bold h-35px ml-2 ${
                                    item.Status === "done"
                                      ? "btn-primary"
                                      : "btn-success"
                                  }`}
                                  onClick={() =>
                                    PointChecked(
                                      item,
                                      "Point2",
                                      defaultValue.ID,
                                      defaultValue
                                    )
                                  }
                                >
                                  {LoadingBtn.Checked &&
                                  LoadingBtn.Checked?.Point === 2 &&
                                  LoadingBtn.Checked?.Index === item.Index ? (
                                    <div className="spinner spinner-white w-20px"></div>
                                  ) : (
                                    <span>
                                      {item.Status === "done"
                                        ? "Đã duyệt"
                                        : "Duyệt"}
                                    </span>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                          <div>{item.Desc}</div>
                        </div>
                      ))}
                    </React.Fragment>
                  ) : (
                    "Chưa chấm"
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="py-8 px-3">
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  Phản hồi đến giáo viên
                </h3>
                <FormComment
                  defaultValue={defaultValue}
                  onSubmit={onSubmitComment}
                />
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  LỊCH SỬ PHẢN HỒI GIÁO VIÊN
                </h3>
                <div>
                  {defaultValue.CommentList &&
                  defaultValue.CommentList.length > 0 ? (
                    <React.Fragment>
                      {defaultValue.CommentList.map((item, index) => (
                        <div
                          className={`bg-gray-100 p-4 rounded ${
                            defaultValue.CommentList.length - 1 !== index &&
                            "mb-3"
                          }`}
                          key={index}
                        >
                          <div className="mb-3 d-flex justify-content-between align-items-center">
                            <div>
                              <div className="text-dark-75 font-weight-boldest">
                                <span className="text-uppercase pr-1">
                                  [{item.User && item.User.Code}]
                                </span>
                                {item.User && item.User.FullName}
                              </div>
                              <div className="text-muted">
                                {moment(item.Date).format("HH:mm DD/MM/YYYY")}
                              </div>
                            </div>
                          </div>
                          <div>{item.Comment}</div>
                        </div>
                      ))}
                    </React.Fragment>
                  ) : (
                    "Chưa có phản hồi"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalPoint;
