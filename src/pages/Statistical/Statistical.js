import React, { useState, useEffect } from "react";
import { Form, Input } from "react-bootstrap";
import { isDev } from "../../_ezs/_helpers/AssetsHelpers";
import "../../_ezs/_assets/sass/pages/Statistical/_Statistical.scss";

const data = [
  {
    ID: "GV001",
    TeacherJson :[
        {
            TeacherName: "Nguyễn Văn A",
            TotalScore :"TĐ",
            Medium :"TB",
        },
    ],
    TaskName: "Nộp bài K7 Sử dụng internet thông minh tiết 1",
    TaskJson: [
        {
            quantity: "100",
            submitted: "50",
            point:"50",

        },
      
    ],
  },
];

function Statistical(props) {
  return (
    <div className={`container-fluid ${!isDev() ? "p-0" : ""}`}>
      <div className="hpanel">
        <div className="panel-body">
          <div className="d-flex">
            <h2 className="font-light m-b-xs tb-head-title">Thống kê</h2>
          </div>
          <div className="filter-statistic">
            <ul className="menu-search">
              <li className="filter-statistic-groupMission">
                <a>
                  <div>
                  <Form.Control type="text" className="W-100" title="Nhiệm vụ" placeholder="Nhiệm vụ" />
                    <i className="fa fa-filter" aria-hidden="true"></i>
                  </div>
                </a>
              </li>
              <li className="filter-statistic-mission">
                <a>
                  <div>
                  <Form.Control type="text" className="W-100" title="Nhiệm vụ" placeholder="Nhóm nhiệm vụ" />
                    <i className="fa fa-filter" aria-hidden="true"></i>
                  </div>
                </a>
              </li>
              <li className="filter-statistic-datestatic">
                <a>
                  <div>
                  <input id='algolia-doc-search' className="W-100" type="text" placeholder='Ngày bắt đầu' autoComplete='off' />
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </div>
                </a>
              </li>
              <li className="filter-statistic-dateEnd">
                <a>
                  <div>
                    <input type="text" className="W-100" placeholder="Ngày bắt đầu" title="Ngày bắt đầu" />
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </div>
                </a>
              </li>
              <li className="filter-statistic-search">
                <a>
                  <div className=" quicksearch">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <button className="btn btn-success h-35px" control-id="ControlID-3">
                      Tìm kiếm
                    </button>
                  </div>
                </a>
              </li>
              <li className="filter-statistic-export">
                <a>
                  <div className=" export-excel">
                    <i className="fa fa-file-excel-o" aria-hidden="true"></i>
                    <button className="btn btn-secondary h-35px">Xuất excel</button>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="table1">
        <div className="hpanel hgreen">
          <div className="panel-heading hbuilt">Danh sách</div>
          <div className="panel-body">
            <div className="note-table">
              <ul className="note-table--item">
                <li className="not-delivered-icon ">
                  <i className="fa fa-circle-thin mr-1" aria-hidden="true"></i>
                  <span>Không được giao</span>
                </li>
                <li className="unpaid-delivered-icon">
                  <i className="fa fa-circle mr-1" aria-hidden="true"></i>
                  <span>Được giao chưa nộp</span>
                </li>
                <li className="sub-delivered-icon">
                  <i className="fa fa-circle mr-1" aria-hidden="true"></i>
                  <span>Đã nộp</span>
                </li>
                <li className="dotted-delivered-icon">
                  <i className="fa fa-circle mr-1" aria-hidden="true"></i>
                  <span>Đã chấm</span>
                </li>
              </ul>
              <ul className="note-table--item">
                <li>
                  <p className="note-text">
                    TĐ : <span>Tổng điểm</span>
                  </p>
                </li>
                <li>
                  <p className="note-text">
                    TB : <span>Điểm trung bình</span>
                  </p>
                </li>
              </ul>
            </div>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <div className="page-report--content">
                <div className="react-bootstrap-table table-responsive table-responsive-attr table-responsiveV1 scroll-custom--auto">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="head-table-mission">
                        <th scope="col" className="text-center m-w200" colspan="4">
                          Giáo viên
                        </th>

                        <th scope="col" className="text-center m-w200" colspan="3">
                          Nộp bài K7 Sử dụng internet thông minh tiết 1
                        </th>

                        <th scope="col" className="text-center m-w200" colspan="3">
                          Nộp bài K7 Sử dụng internet thông minh tiết 2
                        </th>

                        <th scope="col" className="text-center m-w200" colspan="3">
                          Nộp Poster K7 Sử dụng internet thông minh
                        </th>

                        <th scope="col" className="text-center m-w200" colspan="3">
                          THCS - TEAM ONL - Nộp video quay K7 internet tiết 1
                        </th>

                        <th scope="col" className="text-center m-w200" colspan="3">
                          THCS - TEAM ONL - Nộp video quay K7 internet tiết 2{" "}
                        </th>
                      </tr>
                      <tr className="head-table-content" data-title="title-content">
                        <th
                          data-title="Mã nhân viên"
                          className="m-w60 "
                          scope="row"
                        >
                          Mã
                        </th>
                        <th
                          data-title="Tên Nhân viên"
                          className="m-w150"
                          scope="row"
                        >
                          Giáo viên
                        </th>
                        <th data-title="Tổng điểm" className="m-w50" scope="row">
                          TĐ
                        </th>
                        <th
                          data-title=" Điểm trung bình"
                          className="m-w50"
                          scope="row"
                        >
                          TB
                        </th>
                        <th data-title="Đã giao" className="" scope="row">
                          SL:100
                        </th>
                        <th data-title="Đã nộp" className="" scope="row">
                          Nộp:50
                        </th>
                        <th data-title="Đã chấm" className="" scope="row">
                          Chấm:50
                        </th>
                        <th data-title="Đã giao" className="" scope="row">
                          SL:100
                        </th>
                        <th data-title="Đã nộp" className="" scope="row">
                          Nộp:
                        </th>
                        <th data-title="Đã chấm" className="" scope="row">
                          Chấm:
                        </th>
                        <th data-title="Đã giao" className="" scope="row">
                          SL:100
                        </th>
                        <th data-title="Đã Nộp" className="" scope="row">
                          Nộp:70
                        </th>
                        <th data-title="Đã chấm" className="" scope="row">
                          Chấm:
                        </th>
                        <th data-title="Đã giao" className="" scope="row">
                          SL:100
                        </th>
                        <th data-title="Đã Nộp" className="" scope="row">
                          Nộp:
                        </th>
                        <th data-title="Đã chấm" className="" scope="row">
                          Chấm:
                        </th>
                        <th data-title="Đã giao" className="" scope="row">
                          SL:80
                        </th>
                        <th data-title="Đã Nộp" className="" scope="row">
                          Nộp:80
                        </th>
                        <th data-title="Đã chấm" className="" scope="row">
                          Chấm:
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr data-title="giáo viên">
                        <td data-title="Mã NV" scope="row">
                          gv005
                        </td>
                        <td data-title="Tên nhân viên" scope="row">
                          Bùi Hồ Hoàng Kim
                        </td>
                        <td data-title="Tổng điểm" scope="row">
                          115
                        </td>
                        <td data-title="Điểm trung bình" scope="row">
                          38.33
                        </td>
                        <td scope="row" colspan="3"></td>
                        <td scope="row" colspan="3"></td>
                        <td scope="row" colspan="3"></td>
                        <td scope="row" colspan="3"></td>
                        <td scope="row" colspan="3"></td>
                      </tr>
                      <tr data-title="giáo viên">
                        <td data-title="Mã NV" scope="row">
                          gv006
                        </td>
                        <td scope="row">Bùi Hồ Hoàng Kim 1</td>
                        <td scope="row">115</td>
                        <td className="text-center" scope="row">
                          38.33
                        </td>
                        <td
                          className="text-center not-delivered"
                          scope="row"
                          colspan="3"
                        ></td>
                        <td className="text-center" scope="row" colspan="3"></td>
                        <td
                          className="text-center unpaid-delivered"
                          scope="row"
                          colspan="3"
                        ></td>
                        <td className="text-center" scope="row" colspan="3"></td>
                        <td
                          className="text-center sub-delivered"
                          scope="row"
                          colspan="3"
                        ></td>
                      </tr>
                      <tr data-title="giáo viên">
                        <td data-title="Mã NV" scope="row">
                          gv007
                        </td>
                        <td data-title="Mã NV" scope="row">
                          Bùi Hồ Hoàng Kim 2
                        </td>
                        <td data-title="Tổng điểm" scope="row">
                          115
                        </td>
                        <td data-title="Điểm trung bình" scope="row">
                          38.33
                        </td>
                        <td
                          className="text-center dotted-delivered"
                          scope="row"
                          colspan="3"
                        >
                          50
                        </td>
                        <td className="text-center" scope="row" colspan="3"></td>
                        <td className="text-center" scope="row" colspan="3"></td>
                        <td className="text-center" scope="row" colspan="3"></td>
                        <td className="text-center" scope="row" colspan="3"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistical;
