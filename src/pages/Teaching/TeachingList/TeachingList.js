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
            <h2 className="font-light m-b-xs tb-head-title">Quản lý D</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="hpanel hgreen">
            <div class="panel-heading hbuilt">Danh sách chương trình</div>
            <div className="navi navi-hover navi-active navi-link-rounded navi-bold navi-icon-center navi-light-icon px-5">
              <div className="navi-item my-2">
                <a className="navi-link active">
                  <span className="navi-icon mr-4">
                    <i class="fa fa-book" aria-hidden="true"></i>
                  </span>
                  <span className="navi-text font-weight-bolder font-size-lg">
                      Khung Trường Tiểu Học Onl
                  </span>
                </a>
                <a className="navi-link">
                  <span className="navi-icon mr-4">
                    <i class="fa fa-book" aria-hidden="true"></i>
                  </span>
                  <span className="navi-text font-weight-bolder font-size-lg">
                      Khung Trường Tiểu Học Online 1
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="hpanel hgreen">
            <div class="panel-heading hbuilt">Chương trình</div>
            <div className="panel-body">a</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TeachingList.propTypes = {};

export default TeachingList;
