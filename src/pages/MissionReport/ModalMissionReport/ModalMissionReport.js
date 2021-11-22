import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import moment from "moment";
import "moment/locale/vi";
import FormMissionReport from "./FormMissionReport/FormMissionReport";

moment.locale("vi");

ModalMissionReport.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onSubmitMisson: PropTypes.func,
  defaultValue: PropTypes.object,
  isLoading: PropTypes.bool,
};

function ModalMissionReport({
  show,
  onHide,
  onSubmitMisson,
  defaultValue,
  isLoading,
}) {
  console.log(defaultValue);
  if (!defaultValue) return "";
  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header className="open-close" closeButton>
        <Modal.Title>{defaultValue.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="container px-4">
          <div className="row">
            <div className="col-md-7 border-right">
              <div className="py-8 px-3">
                <h3 className="font-size-lg mb-5 font-weight-boldest mt-0">
                  <span className="text-uppercase">Hạn nộp</span>
                  {moment().isAfter(defaultValue.DeadLine) ? (
                    <span className="label label-light-danger label-pill label-inline ml-2 vertical-align-middle">
                      Hết hạn
                    </span>
                  ) : (
                    ""
                  )}
                </h3>
                <div
                  className={`text-capitalize font-size-md font-weight-bold ${
                    moment().isAfter(defaultValue.DeadLine) ? "text-danger" : ""
                  }`}
                >
                  {defaultValue.DeadLine &&
                    moment(defaultValue.DeadLine).format("LLLL")}
                </div>
                <div className="mt-5 border-top py-5">
                  {defaultValue.Desc
                    ? defaultValue.Desc
                    : "Chưa có nội dung nhiệm vụ"}
                </div>
                <div className="border-top pt-5">
                  <h3 className="text-uppercase font-size-lg mb-5 font-weight-boldest mt-0">
                    Báo cáo đã nộp
                  </h3>
                  {defaultValue &&
                  defaultValue.Reports &&
                  defaultValue.Reports.length > 0 ? (
                    <React.Fragment>
                      {defaultValue.Reports.map(
                        (item, index) =>
                          index === 0 && (
                            <React.Fragment key={index}>
                              <div>
                                <i className="fal fa-user-graduate icon-lg"></i>
                                <span className="text-gaia ml-2 font-size-md font-weight-boldest">
                                  <span className="text-uppercase">
                                    [{item.UserCode}]
                                  </span>
                                  .{item.UserFullName} ( Ngày nộp:{" "}
                                  {moment(item.CreateDate).format(
                                    "HH:mm DD/MM/YYYY"
                                  )}{" "}
                                  )
                                </span>
                              </div>
                              <div className="mt-2">{item.Desc}</div>
                              <div className="mt-5">
                                <h4 className="font-size-base font-weight-boldest">
                                  <i className="fal fa-link mr-2"></i> File đính
                                  kèm
                                </h4>
                                {item.FilesJson &&
                                  JSON.parse(item.FilesJson).map(
                                    (file, idx) => (
                                      <a
                                        key={idx}
                                        href={file.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-100 mt-3 rounded d-flex justify-content-between overflow-hidden cursor-pointer align-items-stretch"
                                      >
                                        <div className="p-3 flex-1 d-flex">
                                          <i className="fal fa-file-contract mr-3"></i>
                                          <div className="text-truncate max-w-75 text-dark">
                                            {file.link}
                                          </div>
                                        </div>
                                        <div className="w-40px d-flex justify-content-center align-items-center font-size-lg bg-primary bg-primary">
                                          <i className="fal fa-cloud-download text-white"></i>
                                        </div>
                                      </a>
                                    )
                                  )}
                              </div>
                            </React.Fragment>
                          )
                      )}
                    </React.Fragment>
                  ) : (
                    <div>Chưa có báo cáo nộp</div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <FormMissionReport
                onSubmit={onSubmitMisson}
                defaultValue={defaultValue}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>a</Modal.Footer> */}
    </Modal>
  );
}

export default ModalMissionReport;
