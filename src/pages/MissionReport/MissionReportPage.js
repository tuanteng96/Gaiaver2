import React, { useEffect, useState } from "react";
import { isDev } from "../../_ezs/_helpers/AssetsHelpers";
import { getRequestParams } from "../../_ezs/_helpers/RequestHelpers";
import { toast } from "react-toastify";
import MissionReportCrud from "./_redux/MissionReportCrud";
import BaseTablesCustom from "../../_shared/base-tables/BaseTablesCustom";
import ModalMissionReport from "./ModalMissionReport/ModalMissionReport";
import Swal from "sweetalert2";

import moment from "moment";
import "moment/locale/vi";
import PointsCrud from "../Points/_redux/PointsCrud";
import { useDispatch } from "react-redux";
import { sleep } from "../../_ezs/_helpers/DelayHelpers";
import { setLoadingBtn } from "../Points/_redux/pointsSlice";

moment.locale("vi");

const showErrorPermiss = (error) => {
  Swal.fire({
    title: "Xảy ra lỗi",
    html: `<div class="p-1">
        <div class="mb-3">
          ${error}
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

function MissionReportPage(props) {
  const [listMission, setListMission] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState({
    MissonReport: false,
  });
  const [filters, setFilters] = useState({
    filter2: {
      Key: "",
    },
    Pi: 1,
    Ps: 10,
  });
  const [PageTotal, setPageTotal] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [defaultValue, setDefaultValue] = useState({});
  const dispatch = useDispatch();
  const retrieveMission = async () => {
    !loading && setLoading(true);
    const params = getRequestParams(filters);

    MissionReportCrud.getListMissionRp(params)
      .then((response) => {
        if (response.error) {
          showErrorPermiss(response.error);
        } else {
          const { list, total } = response.data;
          setPageTotal(total);
          setListMission(list);
        }
        setLoading(false);
      })
      .catch(({ response }) => {
        showErrorPermiss(response.error);
      });
  };

  useEffect(() => {
    retrieveMission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (
      defaultValue &&
      Object.keys(defaultValue).length !== 0 &&
      Object.getPrototypeOf(defaultValue) === Object.prototype
    ) {
      const index = listMission.findIndex(
        (item) => item.ID === defaultValue.ID
      );
      index > -1 && setDefaultValue(listMission[index]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listMission]);

  const openModal = (values) => {
    setIsModal(true);
    setDefaultValue(values);
  };

  const hideModal = () => {
    setIsModal(false);
    setDefaultValue({});
  };

  const onSubmitMisson = async (values, { resetForm }) => {
    const newValue = {
      ...values,
      FilesJson:
        values.FilesJson &&
        values.FilesJson.filter((item) => item.link && item.link.length > 0),
    };
    setIsLoading((prev) => ({ ...prev, MissonReport: true }));
    try {
      await MissionReportCrud.sendMissionRp(newValue);
      await retrieveMission();
      setIsLoading((prev) => ({ ...prev, MissonReport: false }));
      toast.success("Gửi báo cáo thành công", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      resetForm();
    } catch ({ response }) {
      setIsLoading((prev) => ({ ...prev, MissonReport: false }));
      toast.error(response.data && response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const checkStatus = (task) => {
    if (!task || (task && task.length === 0)) {
      return (
        <span className="label label-warning label-pill label-inline ml-2">
          Chưa nộp
        </span>
      );
    }
    const idx1 =
      task && task[0]?.Point1List?.findIndex((item) => item.Status === "done");
    const idx2 =
      task && task[0]?.Point2List?.findIndex((item) => item.Status === "done");

    if ((idx1 !== null && idx1 > -1) || (idx2 !== null && idx2 > -1)) {
      return (
        <span className="label label-primary label-pill label-inline ml-2">
          Đã chấm
        </span>
      );
    } else {
      return (
        <span className="label label-success label-pill label-inline ml-2">
          Đã nộp
        </span>
      );
    }
  };

  const getPoint = (task) => {
    const idx1 =
      task && task[0]?.Point1List?.findIndex((item) => item.Status === "done");
    const idx2 =
      task && task[0]?.Point2List?.findIndex((item) => item.Status === "done");
    if ((idx1 !== null && idx1 > -1) || (idx2 !== null && idx2 > -1)) {
      return (
        <span className="font-weight-bolder text-danger font-size-lg">
          {(idx2 !== null && idx2 > -1 && task[0].Point2List[idx2].Point) ||
            (idx1 !== null && idx1 > -1 && task[0].Point1List[idx1].Point)}
        </span>
      );
    }
    return "Chưa có";
  };

  const onSubmitComment = async (values, { resetForm }) => {
    dispatch(setLoadingBtn({ Comment: true }));
    try {
      await PointsCrud.SendComment(values);
      await sleep(500);
      await retrieveMission();
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
      dataField: "Title",
      text: "Tên nhiệm vụ",
      headerStyle: () => {
        return { minWidth: "40%", fontWeight: "800" };
      },
      attrs: { "data-title": "Tên" },
    },
    {
      dataField: `DeadLine`,
      text: "Hạn nộp",
      formatter: (cell, row) => (
        <>
          {moment(row.DeadLine).format("HH:mm:ss DD/MM/YYYY")}
          {moment().isAfter(row.DeadLine) ? (
            <span className="label label-light-danger label-pill label-inline ml-2">
              Hết hạn
            </span>
          ) : (
            ""
          )}
        </>
      ),
      headerStyle: () => {
        return { minWidth: "220px", fontWeight: "800" };
      },
      attrs: { "data-title": "Hạn nộp" },
    },
    {
      dataField: `Status`,
      text: "Trạng thái",
      formatter: (cell, row) => checkStatus(row.Reports),
      headerAlign: "center",
      style: { textAlign: "center" },
      headerStyle: () => {
        return { minWidth: "150px", fontWeight: "800" };
      },
      attrs: { "data-title": "Hạn nộp" },
    },
    {
      dataField: `Poin`,
      text: "Điểm",
      formatter: (cell, row) => getPoint(row.Reports),
      headerStyle: () => {
        return { minWidth: "100px", fontWeight: "800" };
      },
      headerAlign: "center",
      style: { textAlign: "center" },
      attrs: { "data-title": "Điểm" },
    },
    {
      dataField: "#",
      text: "#",
      formatter: (cell, row) => {
        return (
          <div className="text-center">
            <button
              type="button"
              className="btn btn-gaia btn-sm"
              onClick={() => openModal(row)}
            >
              Nộp báo cáo
            </button>
          </div>
        );
      },
      headerAlign: "center",
      headerStyle: () => {
        return { width: "115px" };
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
      setListMission([]);
      const Ps = sizePerPage;
      setFilters({ ...filters, Ps: Ps });
    },
    onPageChange: (page) => {
      setListMission([]);
      const Pi = page;
      setFilters({ ...filters, Pi: Pi });
    },
  };

  return (
    <div className={`container-fluid ${!isDev() ? "p-0" : ""}`}>
      <div className="hpanel">
        <div className="panel-body">
          <div className="d-flex">
            <h2 className="font-light m-b-xs tb-head-title">
              Danh sách nhiệm vụ
            </h2>
          </div>
        </div>
      </div>
      <div className="hpanel hgreen">
        <div className="panel-heading hbuilt">Danh sách</div>
        <BaseTablesCustom
          data={listMission}
          options={options}
          columns={columns}
          loading={loading}
          className="table-responsive-attr"
        />
      </div>
      <ModalMissionReport
        show={isModal}
        onHide={hideModal}
        onSubmitMisson={onSubmitMisson}
        defaultValue={defaultValue}
        isLoading={isLoading.MissonReport}
        onSubmitComment={onSubmitComment}
      />
    </div>
  );
}

export default MissionReportPage;
