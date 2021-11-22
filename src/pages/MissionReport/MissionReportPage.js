import React, { useEffect, useState } from "react";
import { isDev } from "../../_ezs/_helpers/AssetsHelpers";
import { getRequestParams } from "../../_ezs/_helpers/RequestHelpers";
import { toast } from "react-toastify";
import MissionReportCrud from "./_redux/MissionReportCrud";
import BaseTablesCustom from "../../_shared/base-tables/BaseTablesCustom";
import ModalMissionReport from "./ModalMissionReport/ModalMissionReport";

import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

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

  const retrieveMission = async () => {
    !loading && setLoading(true);
    const params = getRequestParams(filters);

    MissionReportCrud.getListMissionRp(params)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          const { list, total } = response.data;
          setPageTotal(total);
          setListMission(list);
        }
        setLoading(false);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  useEffect(() => {
    retrieveMission();
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
    const isPoint =
      task && task.some((item) => item.Point1List || item.Point2List);
    if (isPoint) {
      return (
        <span className="label label-success label-pill label-inline ml-2">
          Đã chấm
        </span>
      );
    } else {
      return (
        <span className="label label-primary label-pill label-inline ml-2">
          Đã nộp
        </span>
      );
    }
  };

  const getPoint = (task) => {
    const isPoint =
      task && task.some((item) => item.Point1List || item.Point2List);
    if (isPoint) return "100";
    return "Chưa có";
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
        return { width: "220px", fontWeight: "800" };
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
        return { width: "150px", fontWeight: "800" };
      },
      attrs: { "data-title": "Hạn nộp" },
    },
    {
      dataField: `Poin`,
      text: "Điểm",
      formatter: (cell, row) => getPoint(row.Reports),
      headerStyle: () => {
        return { width: "100px", fontWeight: "800" };
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
          <div className="text-right">
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
      />
    </div>
  );
}

export default MissionReportPage;