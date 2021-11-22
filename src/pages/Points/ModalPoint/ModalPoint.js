import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

ModalPoint.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  defaultValue: PropTypes.object,
};

function ModalPoint({ show, onHide, defaultValue }) {
  if (!defaultValue) return "";
  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header className="open-close" closeButton>
        <Modal.Title>{defaultValue.TaskName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="container px-4">
          <div className="row">
            <div className="col-md-4">
              <div className="py-8 px-3">
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  Chấm lần 1
                </h3>
                <div className="mb-8">
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập điểm"
                    />
                  </div>
                  <div className="form-group mb-5">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Nhập mô tả"
                      rows={3}
                      name="Desc"
                    />
                  </div>
                  <button
                    className="btn btn-gaia font-weight-boldest"
                    // className={`btn btn-gaia font-size-lg py-3 w-auto ${
                    //   isLoading
                    //     ? "spinner spinner-white spinner-right pl-6 disabled"
                    //     : "px-6"
                    // }`}
                    type="submit"
                  >
                    Chấm điểm
                  </button>
                </div>
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  Lịch sử chấm lần 1
                </h3>
                <div>
                  <div className="bg-gray-100 p-4 rounded">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-dark-75 font-weight-boldest">
                          Bùi Hồ Hoàng Kim
                        </div>
                        <div className="text-muted">
                          {moment().format("HH:mm DD/MM/YYYY")}
                        </div>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-outline-gaia btn-shadow font-weight-boldest mr-2 font-size-md h-35px">
                          50
                        </button>
                        <button className="btn btn-sm btn-success font-weight-boldest h-35px">
                          Duyệt
                        </button>
                      </div>
                    </div>
                    <div>
                      Ghi chép đầy đủ nội dung, có nhiều , góp ý, mở rộng.Duy
                      trì được sự ổn định trong cách dạy.Có nhiều liên hệ, mở
                      rộng, giải thích cho HS hiểu bài.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 border-left border-right">
              <div className="py-8 px-3">
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  Quản lý chấm
                </h3>
                <div className="mb-8">
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập điểm"
                    />
                  </div>
                  <div className="form-group mb-5">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Nhập mô tả"
                      rows={3}
                      name="Desc"
                    />
                  </div>
                  <button
                    className="btn btn-gaia font-weight-boldest"
                    // className={`btn btn-gaia font-size-lg py-3 w-auto ${
                    //   isLoading
                    //     ? "spinner spinner-white spinner-right pl-6 disabled"
                    //     : "px-6"
                    // }`}
                    type="submit"
                  >
                    Chấm điểm
                  </button>
                </div>
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  Lịch sử chấm lần 2
                </h3>
                <div>
                  <div className="bg-gray-100 p-4 rounded">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-dark-75 font-weight-boldest">
                          Bùi Hồ Hoàng Kim
                        </div>
                        <div className="text-muted">
                          {moment().format("HH:mm DD/MM/YYYY")}
                        </div>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-outline-gaia btn-shadow font-weight-boldest mr-2 font-size-md h-35px">
                          50
                        </button>
                        <button className="btn btn-sm btn-success font-weight-boldest h-35px">
                          Duyệt
                        </button>
                      </div>
                    </div>
                    <div>
                      Ghi chép đầy đủ nội dung, có nhiều , góp ý, mở rộng.Duy
                      trì được sự ổn định trong cách dạy.Có nhiều liên hệ, mở
                      rộng, giải thích cho HS hiểu bài.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="py-8 px-3">
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  Phản hồi đến giáo viên
                </h3>
                <div className="mb-8">
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập điểm"
                    />
                  </div>
                  <div className="form-group mb-5">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Nhập mô tả"
                      rows={3}
                      name="Desc"
                    />
                  </div>
                  <button
                    className="btn btn-gaia font-weight-boldest"
                    // className={`btn btn-gaia font-size-lg py-3 w-auto ${
                    //   isLoading
                    //     ? "spinner spinner-white spinner-right pl-6 disabled"
                    //     : "px-6"
                    // }`}
                    type="submit"
                  >
                    Chấm điểm
                  </button>
                </div>
                <h3 className="font-size-md mb-5 font-weight-boldest mt-0 text-uppercase">
                  LỊCH SỬ PHẢN HỒI GIÁO VIÊN
                </h3>
                <div>
                  <div className="bg-gray-100 p-4 rounded">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-dark-75 font-weight-boldest">
                          Bùi Hồ Hoàng Kim
                        </div>
                        <div className="text-muted">
                          {moment().format("HH:mm DD/MM/YYYY")}
                        </div>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-outline-gaia btn-shadow font-weight-boldest mr-2 font-size-md h-35px">
                          50
                        </button>
                        <button className="btn btn-sm btn-success font-weight-boldest h-35px">
                          Duyệt
                        </button>
                      </div>
                    </div>
                    <div>
                      Ghi chép đầy đủ nội dung, có nhiều , góp ý, mở rộng.Duy
                      trì được sự ổn định trong cách dạy.Có nhiều liên hệ, mở
                      rộng, giải thích cho HS hiểu bài.
                    </div>
                  </div>
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