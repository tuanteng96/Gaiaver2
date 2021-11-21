import React, { useEffect, useState } from "react";
import { isDev } from "../../_ezs/_helpers/AssetsHelpers";
import { getRequestParams } from "../../_ezs/_helpers/RequestHelpers";
import { sleep } from "../../_ezs/_helpers/DelayHelpers";
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
    setIsLoading((prev) => ({ ...prev, MissonReport: true }));
    try {
      await sleep(1000);
      setIsLoading((prev) => ({ ...prev, MissonReport: false }));
      toast.success("Gửi báo cáo thành công", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      resetForm();
      console.log(values);
    } catch (error) {
      console.log(error);
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
      dataField: `To`,
      text: "Hạn nộp",
      formatter: (cell, row) => (
        <>
          {moment(row.To).format("HH:mm:ss DD/MM/YYYY")}
          {moment().isAfter(row.To) ? (
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
      formatter: (cell, row) => (
        <>
          <span className="label label-danger label-pill label-inline ml-2">
            Chưa nộp
          </span>
        </>
      ),
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
      formatter: (cell, row) => <>90</>,
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
