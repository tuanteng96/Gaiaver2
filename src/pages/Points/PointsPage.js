import React, { useState, useEffect } from "react";
import { isDev } from "../../_ezs/_helpers/AssetsHelpers";
import BaseTablesCustom from "../../_shared/base-tables/BaseTablesCustom";
import { getRequestParams } from "../../_ezs/_helpers/RequestHelpers";
import ModalPoint from "./ModalPoint/ModalPoint";
import PointsCrud from "./_redux/PointsCrud";
import { sleep } from "../../_ezs/_helpers/DelayHelpers";
import Swal from "sweetalert2";

import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { setPermission } from "./_redux/pointsSlice";
import PointsFiles from "./PointsFiles/PointsFiles";

moment.locale("vi");
// import PropTypes from 'prop-types';

// PointsPage.propTypes = {

//};

const showErrorPermiss = () => {
  Swal.fire({
    title: "Truy cập bị cấm",
    html: `<div class="p-1">
        <div class="mb-3">
          Tài khoản của bạn đã đăng ký sử dụng chức năng Chấm điểm.
        </div>
      </div>`,
    icon: "error",
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: "Đóng",
    buttonsStyling: false,
    allowOutsideClick: false,
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
  }).then(() => {
    window.location.href = "/";
  });
};

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
  const { Permission, R_Token } = useSelector((state) => state.point);

  const dispatch = useDispatch();

  const retrievePoint = async () => {
    !loading && setLoading(true);
    const params = getRequestParams(filters);

    try {
      const { data, more } = await PointsCrud.getList(params, R_Token);
      const { total, list } = data;
      await sleep(500);
      if (!more.co_ban && !more.nang_cao) {
        dispatch(setPermission(null));
        showErrorPermiss();
      } else {
        dispatch(setPermission(more));
        setPageTotal(total);
        setListPoin(list);
      }
      setLoading(false);
    } catch ({ response }) {
      dispatch(setPermission(null));
      setLoading(false);
    }
  };

  useEffect(() => {
    retrievePoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useState(() => {
    if (!Permission) {
      showErrorPermiss();
    }
  }, [Permission]);

  const onSubmitPoint1 = async (values) => {
    try {
      console.log(values);
    } catch ({ response }) {
      console.log(response);
    }
  };

  const onSubmitPoint2 = (values) => {
    try {
      console.log(values);
    } catch ({ response }) {
      console.log(response);
    }
  };

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
      dataField: "UserFullName",
      text: "Giáo viên",
      formatter: (cell, row) => (
        <>
          <div>[{row.UserCode}]</div>
          <div className="font-weight-boldest">{row.UserFullName}</div>
        </>
      ),
      headerStyle: () => {
        return { minWidth: "150px", fontWeight: "800" };
      },
      attrs: { "data-title": "Giáo viên" },
    },
    {
      dataField: "Task",
      text: "Nhiệm vụ",
      headerStyle: () => {
        return { minWidth: "20%", fontWeight: "800" };
      },
      formatter: (cell, row) =>
        row.Task && row.Task.Title ? row.Task.Title : "Chưa có tên",
      attrs: { "data-title": "Nhiêm vụ" },
    },
    {
      dataField: "FilesJson",
      text: "Báo cáo",
      formatter: (cell, row) => {
        return (
          row.FilesJson &&
          JSON.parse(row.FilesJson).map((file, index) => (
            <PointsFiles file={file} key={index} />
          ))
        );
      },
      headerStyle: () => {
        return { minWidth: "150px", fontWeight: "800" };
      },
      attrs: { "data-title": "Báo cáo" },
    },
    {
      dataField: `CreateDate`,
      text: "Ngày nộp",
      formatter: (cell, row) => (
        <>{moment(row.CreateDate).format("HH:mm:ss DD/MM/YYYY")}</>
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

  if (!Permission) return "";

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
        onSubmitPoint1={onSubmitPoint1}
        onSubmitPoint2={onSubmitPoint2}
      />
    </div>
  );
}

export default PointsPage;
