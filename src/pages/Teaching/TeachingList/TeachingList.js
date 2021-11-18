import React from "react";
// import PropTypes from "prop-types";
import "../../../_ezs/_assets/sass/style.react.scss";
import { isDev } from "../../../_ezs/_helpers/AssetsHelpers";

function TeachingList(props) {
  return (
    <div className={`container-fluid ${!isDev() ? "p-0" : ""}`}>
      <div className="hpanel">
        <div className="panel-body">
          <div className="d-flex">
            <h2 className="font-light m-b-xs tb-head-title">Quản lý Dạy học</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="hpanel hgreen">
            <div class="panel-heading hbuilt">Danh sách chương trình</div>
            <div className="card card-custom card-stretch">
              <div className="card-body px-5">
                <div className="navi navi-hover navi-active navi-link-rounded navi-bold navi-icon-center navi-light-icon px-5">
                  <div className="navi-item my-2">
                    <a className="navi-link active">
                      <span className="navi-icon mr-4">
                        <i className="fa fa-book" aria-hidden="true"></i>
                      </span>
                      <span className="navi-text font-weight-bolder font-size-lg">
                        Khung Trường Tiểu Học Onl
                      </span>
                    </a>
                    <a className="navi-link">
                      <span className="navi-icon mr-4">
                        <i className="fa fa-book" aria-hidden="true"></i>
                      </span>
                      <span className="navi-text font-weight-bolder font-size-lg">
                        Khung Trường Tiểu Học Online 1
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="hpanel hgreen">
            <div class="panel-heading hbuilt">
              <div className="card card-custom gutter-b">
                <div className="card-body px-5">
                  <div className="d-flex align-items-center mr-2 py-2">
                    <h3 className="font-weight-boild mr-10">Chọn khối</h3>
                    <div className="d-flex mr-3">
                      <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                        <div className="navi-item d-flex mr-2">
                          <a href="#" className="navi-link active">
                            <span className="navi-text">Khối 1</span>
                          </a>
                          <a href="#" className="navi-link">
                            <span className="navi-text">Khối 2</span>
                          </a>
                          <a href="#" className="navi-link">
                            <span className="navi-text">Khối 3</span>
                          </a>
                          <a href="#" className="navi-link">
                            <span className="navi-text">Khối 4</span>
                          </a>
                          <a href="#" className="navi-link">
                            <span className="navi-text">Khối 5</span>
                          </a>
                          <a href="#" className="navi-link">
                            <span className="navi-text">Khối 6</span>
                          </a>
                          <a href="#" className="navi-link">
                            <span className="navi-text">Khối 7</span>
                          </a>
                          <a href="#" className="navi-link">
                            <span className="navi-text">Khối 8</span>
                          </a>
                          <a href="#" className="navi-link">
                            <span className="navi-text">Khối 9</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-custom d-flex flex-grow-1">
                <div className="card-body flex-grow-1">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TeachingList.propTypes = {};

export default TeachingList;
