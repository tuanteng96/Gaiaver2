import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import moment from "moment";
import "moment/locale/vi";
import FormMissionReport from "./FormMissionReport/FormMissionReport";
import DOMPurify from "dompurify";
import FormComment from "./FormMissionReport/FormComment";

moment.locale("vi");

ModalMissionReport.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onSubmitMisson: PropTypes.func,
  defaultValue: PropTypes.object,
  isLoading: PropTypes.bool,
  onSubmitComment: PropTypes.func,
};

function ModalMissionReport({
  show,
  onHide,
  onSubmitMisson,
  defaultValue,
  isLoading,
  onSubmitComment,
}) {
  const [Points, setPoints] = useState(null);
  const [Reports, setReports] = useState({});

  useEffect(() => {
    if (
      defaultValue &&
      defaultValue.Reports &&
      defaultValue.Reports.length > 0
    ) {
      setReports(defaultValue.Reports[0]);
      const task = defaultValue.Reports;
      const idx1 = task[0]?.Point1List?.findIndex(
        (item) => item.Status === "done"
      );
      const idx2 = task[0]?.Point2List?.findIndex(
        (item) => item.Status === "done"
      );
      if ((idx1 !== null && idx1 > -1) || (idx2 !== null && idx2 > -1)) {
        setPoints(
          (idx2 !== null && idx2 > -1 && task[0].Point2List[idx2]) ||
            (idx1 !== null && idx1 > -1 && task[0].Point1List[idx1])
        );
      }
    } else {
      setPoints(null);
    }
  }, [defaultValue]);

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
                <div
                  className="mt-5 border-top py-5"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      `${
                        defaultValue.Desc
                          ? defaultValue.Desc
                          : "Chưa có nội dung nhiệm vụ"
                      }`
                    ),
                  }}
                />
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
                Points={Points}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      {Points && (
        <Modal.Footer className="justify-content-start text-left">
          <div className="row w-100">
            <div className="col-md-2">
              <h3 className="text-uppercase font-size-lg mb-5 font-weight-boldest mt-0">
                Nhận xét
              </h3>
            </div>
            <div className="col-md-7">
              <div className="d-flex">
                <div className="d-flex">
                  <div className="text-dark-50 align-items-end">Ngày chấm</div>
                  <abbr
                    title={moment().format("HH:mm:ss DD/MM/YYYY")}
                    className="font-size-md font-weight-bolder initialism pl-3"
                  >
                    {moment(Points.Date).format("HH:mm:ss DD/MM/YYYY")}
                  </abbr>
                </div>
                <div className="ml-10 d-flex align-items-end">
                  <div className="text-dark-50">Người chấm</div>
                  <abbr
                    title="Nguyễn Tài Tuấn"
                    className="font-size-md font-weight-bolder initialism pl-3"
                  >
                    {Points.User && Points.User.FullName}
                  </abbr>
                </div>
              </div>
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(Points.Desc),
                }}
              />
              <h3 className="text-uppercase font-size-lg font-weight-boldest my-4">
                <i className="far fa-comments-alt text-dark-70"></i> Phản hồi
              </h3>
              <FormComment defaultValue={Reports} onSubmit={onSubmitComment} />
              <div>
                {Reports &&
                Reports.CommentList &&
                Reports.CommentList.length > 0 ? (
                  <div>
                    {Reports.CommentList.map((item, index) => (
                      <div
                        className={`rounded p-3 text-dark-50 text-left mt-3 ${
                          item.Status !== "user"
                            ? "bg-gray-100"
                            : "bg-light-primary"
                        }`}
                        key={index}
                      >
                        <div className="mb-1">
                          <span className="text-dark-75 text-hover-primary font-weight-bold font-size-h6">
                            {item.User && item.User.FullName}
                          </span>
                          <span class="font-size-sm pl-3">
                            {moment(item.Date).fromNow()}
                          </span>
                        </div>
                        {item.Comment}
                      </div>
                    ))}
                  </div>
                ) : (
                  "Không có phản hồi"
                )}
              </div>
            </div>
            <div className="col-md-2 offset-md-1">
              <div className="ribbon ribbon-clip ribbon-left h-130px border border-gaia rounded">
                <div className="ribbon-target" style={{ top: "10px" }}>
                  <span className="ribbon-inner bg-gaia" />
                  Điểm
                </div>
                <div className="display-1 font-weight-boldest text-center mt-10 text-dark">
                  {Points.Point}
                </div>
              </div>
            </div>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default ModalMissionReport;
