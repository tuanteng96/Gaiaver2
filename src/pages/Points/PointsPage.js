import React, { useState, useEffect } from "react";
import { isDev } from "../../_ezs/_helpers/AssetsHelpers";
import BaseTablesCustom from "../../_shared/base-tables/BaseTablesCustom";
import { getRequestParams } from "../../_ezs/_helpers/RequestHelpers";
import ModalPoint from "./ModalPoint/ModalPoint";

import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");
// import PropTypes from 'prop-types';

// PointsPage.propTypes = {

// };
const data = [
  {
    ID: 1,
    TeacherName: "Nguyễn Tài Tuấn",
    TeacherUSN: "GV005",
    TaskName: "Nộp bài K7 Sử dụng internet thông minh tiết 1",
    FilesJson: [
      {
        Title: "Video bài giảng",
        Path: "https://google.com",
      },
      {
        Title: "Giáo án",
        Path: "https://google.com",
      },
    ],
    DateFiling: "2021-11-21T12:44:11",
  },
];

function PointsPage(props) {
  const [listPoin, setListPoin] = useState([]);
  const [filters, setFilters] = useState({
    Pi: 1,
    Ps: 10,
  });
  const [loading, setLoading] = useState(false);
  const [PageTotal, setPageTotal] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [defaultValue, setDefaultValue] = useState({});

  const retrievePoint = async () => {
    !loading && setLoading(true);
    const params = getRequestParams(filters);
    console.log(params);
    setTimeout(() => {
      setPageTotal(1);
      setListPoin(data);
      setLoading(false);
    }, 1000);

    // MissionReportCrud.getListMissionRp(params)
    //   .then((response) => {
    //     if (response.error) {
    //       console.log(response.error);
    //     } else {
    //       const { list, total } = response.data;
    //       setPageTotal(total);
    //       setListMission(list);
    //     }
    //     setLoading(false);
    //   })
    //   .catch(({ response }) => {
    //     console.log(response);
    //   });
  };

  useEffect(() => {
    retrievePoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const openModal = (values) => {
    setIsModal(true);
    setDefaultValue(values);
  };

  const hideModal = () => {
    setIsModal(false);
    setDefaultValue({});
  };

  const columns = [
    {
      dataField: "",
      text: "STT",
      formatter: (cell, row, rowIndex) => {
        const rowNumber = filters.Ps * (filters.Pi - 1) + (rowIndex + 1);
        return rowNumber;
      },
      headerStyle: () => {
        return { width: "60px", fontWeight: "800" };
      },
      headerAlign: "center",
      style: { textAlign: "center" },
      attrs: { "data-title": "STT" },
    },
    {
      dataField: "TeacherName",
      text: "Giáo viên",
      formatter: (cell, row) => (
        <>
          <div>[{row.TeacherUSN}]</div>
          <div className="font-weight-boldest">{row.TeacherName}</div>
        </>
      ),
      headerStyle: () => {
        return { minWidth: "150px", fontWeight: "800" };
      },
      attrs: { "data-title": "Giáo viên" },
    },
    {
      dataField: "TaskName",
      text: "Nhiệm vụ",
      headerStyle: () => {
        return { minWidth: "20%", fontWeight: "800" };
      },
      attrs: { "data-title": "Nhiêm vụ" },
    },
    {
      dataField: "FilesJson",
      text: "Báo cáo",
      formatter: (cell, row) => (
        <>
          {row.FilesJson.map((file, index) => (
            <a
              key={index}
              href={file.Path}
              target="_blank"
              rel="noopener noreferrer"
              className="d-block text-dark my-1 text-hover-primary"
            >
              <i className="fal fa-link mr-2"></i>
              <ins>{file.Title}</ins>
            </a>
          ))}
        </>
      ),
      headerStyle: () => {
        return { minWidth: "150px", fontWeight: "800" };
      },
      attrs: { "data-title": "Báo cáo" },
    },
    {
      dataField: `DateFiling`,
      text: "Ngày nộp",
      formatter: (cell, row) => (
        <>{moment(row.DateFiling).format("HH:mm:ss DD/MM/YYYY")}</>
      ),
      headerStyle: () => {
        return { minWidth: "150px", fontWeight: "800", maxWidth: "100%" };
      },
      attrs: { "data-title": "Ngày nộp" },
    },
    {
      dataField: `Status`,
      text: "Trạng thái",
      formatter: (cell, row) => (
        <>
          <span className="label label-danger label-pill label-inline ml-2">
            Chấm lần 1
          </span>
        </>
      ),
      headerAlign: "center",
      style: { textAlign: "center" },
      headerStyle: () => {
        return { minWidth: "120px", fontWeight: "800" };
      },
      attrs: { "data-title": "Trạng thái" },
    },
    {
      dataField: "#",
      text: "#",
      formatter: (cell, row) => {
        return (
          <div className="text-right">
            <button
              type="button"
              className="btn btn-gaia btn-sm"
              onClick={() => openModal(row)}
            >
              Chấm điểm
            </button>
          </div>
        );
      },
      headerAlign: "center",
      headerStyle: () => {
        return { minWidth: "100%", width: "110px" };
      },
      attrs: { "data-action": "true" },
    },
  ];

  const options = {
    custom: true,
    totalSize: PageTotal,
    page: filters.Pi,
    sizePerPage: filters.Ps,
    alwaysShowAllBtns: true,
    onSizePerPageChange: (sizePerPage) => {
      setListPoin([]);
      const Ps = sizePerPage;
      setFilters({ ...filters, Ps: Ps });
    },
    onPageChange: (page) => {
      setListPoin([]);
      const Pi = page;
      setFilters({ ...filters, Pi: Pi });
    },
  };
  return (
    <div className={`container-fluid ${!isDev() ? "p-0" : ""}`}>
      <div className="hpanel">
        <div className="panel-body">
          <div className="d-flex">
            <h2 className="font-light m-b-xs tb-head-title">Chấm điểm</h2>
          </div>
        </div>
      </div>
      <div className="hpanel hgreen">
        <div className="panel-heading hbuilt">Danh sách</div>
        <BaseTablesCustom
          data={listPoin}
          options={options}
          columns={columns}
          loading={loading}
          className="table-responsive-attr"
        />
      </div>
      <ModalPoint
        show={isModal}
        onHide={hideModal}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default PointsPage;
