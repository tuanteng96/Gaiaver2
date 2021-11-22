import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import SVG from "react-inlinesvg";
// import PropTypes from "prop-types";
import { isDev, toAbsoluteUrl } from "../../../_ezs/_helpers/AssetsHelpers";
import { NavLink } from "react-router-dom";
import ModalTeaching from "./ModalTeaching/ModalTeaching";

const fechData = [
  {
    Id: 1,
    Class: "Khối 1",
    Lesson: [
      {
        Title: "Phòng tránh bệnh dịch lây nhiễm ( Tiết 1 )",
        Image: "https://ver2.hoccunggaia.edu.vn/data/img.jpg",
        LessonGA: "https://ver2.hoccunggaia.edu.vn/data/ga.pdf",
        LessonBG: "https://ver2.hoccunggaia.edu.vn/data/test/story_html5.html",
      },
    ],
  },
  {
    Id: 2,
    Class: "Khối 2",
    Lesson: [],
  },
  {
    Id: 3,
    Class: "Khối 3",
    Lesson: [],
  },
  {
    Id: 4,
    Class: "Khối 4",
    Lesson: [],
  },
  {
    Id: 5,
    Class: "Khối 5",
    Lesson: [],
  },
];

function TeachingList(props) {
  const [keyTab, setKetTab] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const LessonKTT = "https://ver2.hoccunggaia.edu.vn/data/k.pdf";

  useEffect(() => {
    setKetTab(fechData[0].Id);
  }, []);

  const onOpenModal = (values) => {
    setDefaultValues(values);
    setIsModal(true);
  };

  const onHideModal = () => {
    setDefaultValues({});
    setIsModal(false);
  };

  return (
    <div className={`container-fluid mb-6 ${!isDev() ? "p-0" : ""}`}>
      <div className="hpanel">
        <div className="panel-body">
          <div className="d-flex">
            <h2 className="font-light m-b-xs tb-head-title">Quản lý dạy học</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card card-custom h-100">
            <div className="card-header">
              <h3 class="card-title font-size-xl">Khung chương trình</h3>
            </div>
            <div className="card-body">
              <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
                <div className="navi-item mb-0">
                  <NavLink
                    className="navi-link py-4 active"
                    to="/admin/online/day-hoc"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Design/Layers.svg"
                          )}
                        ></SVG>
                      </span>
                    </span>
                    <span className="navi-text">
                      Khung Trường Tiểu Học chuẩn tháng 9
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <Tab.Container activeKey={`key-${keyTab}`}>
            <div className="card card-custom">
              <div className="card-header align-items-center">
                <div className="d-flex align-items-center">
                  <h3 class="card-title mr-10">Chọn khối</h3>
                  <Nav
                    onSelect={(selectedKey) => {
                      setKetTab(selectedKey.replace("key-", ""));
                    }}
                  >
                    {fechData &&
                      fechData.map((item, index) => (
                        <Nav.Link
                          className={`btn mx-1 font-weight-bold ${
                            `key-${keyTab}` === `key-${item.Id}`
                              ? "btn-light-success"
                              : "btn-light"
                          }`}
                          eventKey={`key-${item.Id}`}
                          key={index}
                        >
                          {item.Class}
                        </Nav.Link>
                      ))}
                  </Nav>
                </div>
                <button
                  className="btn btn-primary btn-shadow"
                  onClick={() =>
                    onOpenModal({
                      LessonKTT: LessonKTT,
                      type: "LessonKTT",
                    })
                  }
                >
                  Khung chương trình
                </button>
              </div>
            </div>
            <Tab.Content>
              {fechData &&
                fechData.map((item, index) => (
                  <Tab.Pane eventKey={`key-${item.Id}`} key={index}>
                    <div className="card card-custom">
                      <div className="card-body">
                        <div className="row pb-6">
                          {item.Lesson.map((lesson, idx) => {
                            return (
                              <div
                                className="col-xl-3 col-lg-6 col-md-6 col-sm-6"
                                key={idx}
                              >
                                <div className="lesson-list__item">
                                  <div className="image py-0">
                                    <img
                                      src={lesson.Image}
                                      alt={lesson.Title}
                                    />
                                    <div className="lesson-list__btn">
                                      <button
                                        className="lesson-btn cursor-pointer"
                                        type="button"
                                        onClick={() =>
                                          onOpenModal({
                                            ...lesson,
                                            type: "LessonBG",
                                          })
                                        }
                                      >
                                        Mở bài giảng
                                      </button>
                                      <button
                                        className="lesson-btn cursor-pointer"
                                        type="button"
                                        onClick={() =>
                                          onOpenModal({
                                            ...lesson,
                                            type: "LessonGA",
                                          })
                                        }
                                      >
                                        Xem giáo án
                                      </button>
                                    </div>
                                  </div>
                                  <div className="title pt-4">
                                    {lesson.Title}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                ))}
            </Tab.Content>
          </Tab.Container>

          <ModalTeaching
            show={isModal}
            onHide={onHideModal}
            defaultValues={defaultValues}
          />
        </div>
      </div>
    </div>
  );
}

export default TeachingList;
