import React, { useState, useEffect } from "react";
import { isDev } from "../../_ezs/_helpers/AssetsHelpers";
import BaseTablesCustom from "../../_shared/base-tables/BaseTablesCustom";
import { getRequestParams } from "../../_ezs/_helpers/RequestHelpers";
import ModalPoint from "./ModalPoint/ModalPoint";
import PointsCrud from "./_redux/PointsCrud";
import { sleep } from "../../_ezs/_helpers/DelayHelpers";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import PointsFilter from "./PointsFilter/PointsFilter";

import { useDispatch, useSelector } from "react-redux";
import { setLoadingBtn, setPermission } from "./_redux/pointsSlice";

import moment from "moment";
import "moment/locale/vi";
import PointsListFiles from "./PointsFiles/PointsListFiles/PointsListFiles";

moment.locale("vi");
// import PropTypes from 'prop-types';

// PointsPage.propTypes = {

//};

const showErrorPermiss = () => {
  Swal.fire({
    title: "Truy cập bị cấm",
    html: `<div class="p-1">
        <div class="mb-3">
          Bạn không có quyền truy cập chức năng Chấm điểm.
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
    filter2: {
      TaskGroupID: null,
      TaskID: null,
      UserID: null,
      From: "",
      To: "",
      Method: "moi_nhat",
      Status: ""
    },
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
        await dispatch(setPermission(null));
      } else {
        await dispatch(setPermission(more));
        setPageTotal(total);
        setListPoin(list);
      }
      setLoading(false);
    } catch ({ response }) {
      await dispatch(setPermission(null));
      setLoading(false);
    }
  };

  useEffect(() => {
    retrievePoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (Permission === null) {
      showErrorPermiss();
    }
  }, [Permission]);

  useEffect(() => {
    if (
      defaultValue &&
      Object.keys(defaultValue).length !== 0 &&
      Object.getPrototypeOf(defaultValue) === Object.prototype
    ) {
      const index = listPoin.findIndex((item) => item.ID === defaultValue.ID);
      index > -1 && setDefaultValue(listPoin[index]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listPoin]);

  const onSubmitPoint1 = async (values, { resetForm }) => {
    dispatch(setLoadingBtn({ Point1: true }));
    try {
      await PointsCrud.SendPoint1(values);
      await sleep(500);
      await retrievePoint();
      dispatch(setLoadingBtn({ Point1: false }));
      toast.success("Chấm điểm thành công", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      resetForm();
    } catch ({ response }) {
      dispatch(setLoadingBtn({ Point1: false }));
      toast.error(response.data && response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const onSubmitPoint2 = async (values, { resetForm }) => {
    dispatch(setLoadingBtn({ Point2: true }));
    try {
      await PointsCrud.SendPoint2(values);
      await sleep(500);
      await retrievePoint();
      dispatch(setLoadingBtn({ Point2: false }));
      toast.success("Chấm điểm thành công", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      resetForm();
    } catch ({ response }) {
      dispatch(setLoadingBtn({ Point2: false }));
      toast.error(response.data && response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const onSubmitComment = async (values, { resetForm }) => {
    dispatch(setLoadingBtn({ Comment: true }));
    try {
      await PointsCrud.SendComment(values);
      await sleep(500);
      await retrievePoint();
      dispatch(setLoadingBtn({ Comment: false }));
      toast.success("Gửi phản hồi thành công.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      resetForm();
    } catch ({ response }) {
      dispatch(setLoadingBtn({ Comment: false }));
      toast.error(response.data && response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const onFilters = async (values) => {
    const newValue = {
      ...values,
      From: values.From ? moment(values.From).format("YYYY-MM-DD") : "",
      To: values.To ? moment(values.To).format("YYYY-MM-DD") : "",
    };
    setListPoin([]);
    setFilters((prev) => ({ ...prev, Pi: 1, filter2: newValue }));
  };

  const PointChecked = async (item, type, ID, arr) => {
    const idx1 =
      arr &&
      arr.Point1List &&
      arr.Point1List.findIndex((sub) => sub.Status === "done");
    const idx2 =
      arr &&
      arr.Point2List &&
      arr.Point2List.findIndex((sub) => sub.Status === "done");
    const newData = {
      ID: ID,
      Status: "done",
      Index1: 0,
      Index2: 0,
    };
    const dataRemove = {
      ...newData,
      Status: "",
    };
    const aciton = {
      Index: item.Index,
    };

    if (type === "Point1") {
      newData.Index1 = item.Index;
      aciton.Point = 1;
    }
    if (type === "Point2") {
      newData.Index2 = item.Index;
      aciton.Point = 2;
    }

    dispatch(setLoadingBtn({ Checked: aciton }));
    try {
      if ((idx1 !== null && idx1 > -1) || (idx2 !== null && idx2 > -1)) {
        if (idx1 !== null && idx1 > -1) {
          dataRemove.Index1 = arr.Point1List[idx1].Index || 0;
        }
        if (idx2 !== null && idx2 > -1) {
          dataRemove.Index2 = arr.Point2List[idx2].Index || 0;
        }
        await PointsCrud.Checked(dataRemove);
      }

      if (item.Status === "") {
        await PointsCrud.Checked(newData);
      }
      await sleep(500);
      await retrievePoint();
      dispatch(setLoadingBtn({ Checked: false }));

      toast.success(
        item.Status !== "done"
          ? "Duyệt chấm điểm thành công."
          : "Hủy duyệt bài chấm thành công.",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        }
      );
    } catch ({ response }) {
      dispatch(setLoadingBtn({ Checked: false }));
      toast.error(response?.data && response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
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

  const renderStatus = (item) => {
    const isDone1 =
      item.Point1List && item.Point1List.some((item) => item.Status === "done");
    const isDone2 =
      item.Point2List && item.Point2List.some((item) => item.Status === "done");
    if (isDone1 || isDone2) {
      return (
        <span className="label label-primary label-pill label-inline ml-2">
          Đã duyệt
        </span>
      );
    }
    if (item.Point1List && !item.Point2List) {
      return (
        <span className="label label-success label-pill label-inline ml-2">
          Chấm lần 1
        </span>
      );
    }
    if (item.Point2List) {
      return (
        <span className="label label-success label-pill label-inline ml-2">
          Chấm lần 2
        </span>
      );
    }
    return (
      <span className="label label-warning label-pill label-inline ml-2">
        Chưa chấm
      </span>
    );
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
        return { minWidth: "300px", fontWeight: "800" };
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
          <PointsListFiles
            FilesJson={row.FilesJson && JSON.parse(row.FilesJson)}
          />
        );
      },
      headerStyle: () => {
        return { minWidth: "150px", fontWeight: "800", maxWidth: "400px" };
      },
      attrs: { "data-title": "Báo cáo" },
    },
    {
      dataField: `Desc`,
      text: "Mô tả",
      formatter: (cell, row) => <>{row.Desc ? row.Desc : "Không có mô tả"}</>,
      headerStyle: () => {
        return { minWidth: "150px", fontWeight: "800", maxWidth: "100%" };
      },
      attrs: { "data-title": "Mô tả" },
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
      formatter: (cell, row) => renderStatus(row),
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
        return { width: "110px" };
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
        >
          <PointsFilter
            initialValues={filters.filter2}
            onSubmit={onFilters}
            loading={loading}
          />
        </BaseTablesCustom>
      </div>
      <ModalPoint
        show={isModal}
        onHide={hideModal}
        defaultValue={defaultValue}
        onSubmitPoint1={onSubmitPoint1}
        onSubmitPoint2={onSubmitPoint2}
        onSubmitComment={onSubmitComment}
        PointChecked={PointChecked}
      />
    </div>
  );
}

export default PointsPage;
