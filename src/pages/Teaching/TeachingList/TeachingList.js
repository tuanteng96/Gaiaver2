import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
// import PropTypes from "prop-types";
import { isDev } from "../../../_ezs/_helpers/AssetsHelpers";
import { NavLink } from "react-router-dom";
import ModalTeaching from "./ModalTeaching/ModalTeaching";

const fechData = [
  {
    Id: 1,
    Class: "Khối 1",
    Lesson: [
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 2_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 3_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 4_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 4_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title:
          "Khung Trường Tiểu Học chuẩn tháng 9 Online Khung Trường Tiểu Học chuẩn tháng 9 Online",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 4_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 4_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "Khung Trường Tiểu Học chuẩn tháng 9 Online",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 4_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
    ],
  },
  {
    Id: 2,
    Class: "Khối 2",
    Lesson: [
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
    ],
  },
  {
    Id: 3,
    Class: "Khối 3",
    Lesson: [
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
    ],
  },
  {
    Id: 4,
    Class: "Khối 4",
    Lesson: [
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
    ],
  },
  {
    Id: 5,
    Class: "Khối 5",
    Lesson: [
      {
        Title: "K1_Tự làm việc của mình_Tiết 5_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%205.jpg.png",
      },
      {
        Title: "K5_Tự làm việc của mình_Tiết 5_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 5_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 5_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
    ],
  },
  {
    Id: 6,
    Class: "Khối 6",
    Lesson: [
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
    ],
  },
  {
    Id: 7,
    Class: "Khối 7",
    Lesson: [
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
    ],
  },
  {
    Id: 8,
    Class: "Khối 8",
    Lesson: [
      {
        Title: "K1_Tự làm việc của mình_Tiết 8_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
    ],
  },
  {
    Id: 9,
    Class: "Khối 9",
    Lesson: [
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
      {
        Title: "K1_Tự làm việc của mình_Tiết 1_Onl",
        Image:
          "https://dayhoc.hoccunggaia.edu.vn/Upload/thumbnails/Hinh%20tieu%20de%20bai%20hoc_Tiet%201.jpg.png",
      },
    ],
  },
];

function TeachingList(props) {
  const [keyTab, setKetTab] = useState("");
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setKetTab(fechData[0].Id);
  }, []);

  const onOpenModal = () => {
    setIsModal(true);
  };

  const onHideModal = () => {
    setIsModal(false);
  };

  return (
    <div className={`container-fluid ${!isDev() ? "p-0" : ""}`}>
      <div className="hpanel">
        <div className="panel-body">
          <div className="d-flex">
            <h2 className="font-light m-b-xs tb-head-title text-uppercase ">
              Quản lý Dạy học
            </h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="hpanel hgreen slide-backgroud">
            <div className="card card-custom card-stretch">
              <div className="card-body py-0">
                <div className="navi navi-hover navi-active navi-link-rounded navi-bold navi-icon-center navi-light-ico">
                  <div className="navi-item my-2">
                    <NavLink className="navi-link active pl-0" to="/">
                      <span className="navi-icon mr-2 text-left">
                        <i className="fa fa-book" aria-hidden="true"></i>
                      </span>
                      <span className="navi-text font-weight-bolder font-size-lg">
                        Khung Trường Tiểu Học chuẩn tháng 9 Online
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <Tab.Container activeKey={`key-${keyTab}`}>
            <div className="card card-custom gutter-b">
              <div className="card-body px-3 py-0 pl-9">
                <div className="d-flex align-items-center mr-2 py-2">
                  <h3 className="font-weight-boild mr-10 mb-0">Chọn khối</h3>
                  <div className="d-flex mr-3">
                    <Nav
                      onSelect={(selectedKey) => {
                        setKetTab(selectedKey.replace("key-", ""));
                      }}
                      className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row"
                    >
                      {fechData &&
                        fechData.map((item, index) => (
                          <Nav.Item key={index}>
                            <Nav.Link eventKey={`key-${item.Id}`}>
                              {item.Class}
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                    </Nav>
                  </div>
                </div>
              </div>
            </div>
            <Tab.Content>
              {fechData &&
                fechData.map((item, index) => (
                  <Tab.Pane eventKey={`key-${item.Id}`} key={index}>
                    <div className="card card-custom d-flex flex-grow-1">
                      <div className="card-body flex-grow-1">
                        <div className="row pb-6">
                          {item.Lesson.map((a, idx) => {
                            return (
                              <div
                                className="col-xl-3 col-lg-6 col-md-6 col-sm-6"
                                key={idx}
                              >
                                <div className="lesson-list__item">
                                  <div className="image py-0">
                                    <img src={a.Image} alt={a.Title} />
                                    <div className="lesson-list__btn">
                                      <button
                                        className="lesson-btn"
                                        type="button"
                                        onClick={onOpenModal}
                                      >
                                        Mở bài giảng
                                      </button>
                                      <button
                                        className="lesson-btn"
                                        type="button"
                                        onClick={onOpenModal}
                                      >
                                        Xem giáo án
                                      </button>
                                    </div>
                                  </div>
                                  <div className="title pt-4">{a.Title}</div>
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

          <ModalTeaching show={isModal} onHide={onHideModal}/>
        </div>
      </div>
    </div>
  );
}

export default TeachingList;
