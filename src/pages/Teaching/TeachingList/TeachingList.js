import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import SVG from "react-inlinesvg";
// import PropTypes from "prop-types";
import {
  isDev,
  toAbsoluteUrl,
  toAbsoluteUrlSv,
} from "../../../_ezs/_helpers/AssetsHelpers";
import Swal from "sweetalert2";
import ModalTeaching from "./ModalTeaching/ModalTeaching";
import { useDispatch, useSelector } from "react-redux";
import { fetchLessons } from "../_redux/teachingSlice";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function TeachingList(props) {
  const [keyTab, setKetTab] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [ListKTT, setListKTT] = useState([]);
  const [CurrentKTT, setCurrentKTT] = useState(null);
  const dispatch = useDispatch();
  const { UserID, errorFetchLessons, Programs } = useSelector((state) => ({
    UserID: state.auth.Info?.User?.ID,
    errorFetchLessons: state.teaching.error.fetchLessons,
    Programs: state.teaching.Programs,
  }));

  useEffect(() => {
    const objParmas = {
      _key: "",
      Status: "",
      _pi: 1,
      _ps: 1000,
      _orders: {},
      _ignoredf: ["Status"],
    };
    dispatch(fetchLessons({ data: objParmas, UserID }));
  }, [dispatch, UserID]);

  useEffect(() => {
    if (errorFetchLessons) {
      Swal.fire({
        icon: "error",
        title: "Xảy ra lỗi !",
        html: `<div>Bạn không thể truy cập dạy học Online. Vui lòng liên hệ quản trị viên.<div><div class="text-danger font-size-xs font-weight-boldest">ERROR : ${errorFetchLessons}</div>`,
        customClass: {
          confirmButton: "btn btn-success",
        },
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
    }
  }, [errorFetchLessons]);

  useEffect(() => {
    //console.log(Programs);
    const { truong } = Programs;
    if (truong && Array.isArray(truong)) {
      var newPrograms = [];
      for (const program of truong) {
        if (program.chuong_trinh && Array.isArray(program.chuong_trinh)) {
          for (const prog of program.chuong_trinh) {
            var newLesson = [];
            if (prog.bai_giang && prog.bai_giang.length > 0) {
              for (var less of prog.bai_giang) {
                if (CheckExpire(less)) {
                  const classLess = less.lop;
                  const indexClass = newLesson.findIndex(
                    (sub) => sub.Class === classLess
                  );
                  if (indexClass === -1) {
                    newLesson.push({ Class: classLess, bai_giang: [less] });
                  } else {
                    newLesson[indexClass].bai_giang.push(less);
                  }
                }
              }
            }
            newPrograms.push({ ...prog, Classs: newLesson });
          }
        }
      }
      if (newPrograms && newPrograms.length > 0) {
        if (
          Array.isArray(newPrograms[0]?.khoi_hoc) &&
          newPrograms[0].khoi_hoc.length > 0
        ) {
          setKetTab(newPrograms[0].khoi_hoc[0]);
        }
        setCurrentKTT(newPrograms[0]);
      }
      setListKTT(newPrograms);
    }
  }, [Programs]);

  const onOpenModal = (values) => {
    setDefaultValues(values);
    setIsModal(true);
  };

  const onHideModal = () => {
    setDefaultValues({});
    setIsModal(false);
  };

  const CheckExpire = ({ tu_ngay, den_ngay }) => {
    return (
      moment().diff(den_ngay, "days") < 1 && moment().diff(tu_ngay, "days") >= 0
    );
  };

  //console.log(ListKTT);

  if (errorFetchLessons) return "";

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
              <h3 className="card-title font-size-xl">Khung chương trình</h3>
            </div>
            <div className="card-body">
              <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
                <div className="navi-item mb-0">
                  {ListKTT && ListKTT.length > 0
                    ? ListKTT.map((item, index) => (
                        <div
                          className={`navi-link py-4 mb-1 cursor-pointer ${CurrentKTT.id ===
                            item.id && "active"}`}
                          key={index}
                          onClick={() => setCurrentKTT(item)}
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
                          <span className="navi-text">{item.ten}</span>
                        </div>
                      ))
                    : "Bạn không có khung chương trình nào."}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {CurrentKTT && (
            <Tab.Container activeKey={`key-${keyTab}`}>
              <div className="card card-custom">
                <div className="card-header align-items-center">
                  <div className="d-flex align-items-center">
                    <h3 className="card-title mr-10">Chọn khối</h3>
                    <Nav
                      onSelect={(selectedKey) => {
                        setKetTab(selectedKey.replace("key-", ""));
                      }}
                    >
                      {CurrentKTT.khoi_hoc &&
                        CurrentKTT.khoi_hoc.map((item, index) => (
                          <Nav.Link
                            className={`btn mx-1 font-weight-bold ${
                              `key-${keyTab}` === `key-${item}`
                                ? "btn-light-success"
                                : "btn-light"
                            }`}
                            eventKey={`key-${item}`}
                            key={index}
                          >
                            Khối {item}
                          </Nav.Link>
                        ))}
                    </Nav>
                  </div>
                  <button
                    className="btn btn-primary btn-shadow"
                    onClick={() =>
                      onOpenModal({
                        LessonKTT: CurrentKTT.pdf,
                        type: "LessonKTT",
                      })
                    }
                  >
                    Khung chương trình
                  </button>
                </div>
              </div>
              <Tab.Content>
                {CurrentKTT.Classs && CurrentKTT.Classs.length > 0 ? (
                  CurrentKTT.Classs.map((item, index) => (
                    <Tab.Pane eventKey={`key-${item.Class}`} key={index}>
                      <div className="card card-custom">
                        <div className="card-body">
                          <div className="row pb-6">
                            {item.bai_giang.map((lesson, idx) => {
                              return (
                                <div
                                  className="col-xl-3 col-lg-6 col-md-6 col-sm-6"
                                  key={idx}
                                >
                                  <div className="lesson-list__item">
                                    <div className="image py-0">
                                      <img
                                        src={toAbsoluteUrlSv(
                                          `upload/image/${lesson.thumbnail}`
                                        )}
                                        alt={lesson.ten}
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
                                      {lesson.ten}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                  ))
                ) : (
                  <div className="p-5">Không có bài giảng trong lớp này.</div>
                )}
              </Tab.Content>
            </Tab.Container>
          )}
          {!CurrentKTT && "Bạn không có khung chương trình nào."}
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
