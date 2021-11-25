import React, { useState, useEffect } from "react";
import LoaderTable from "../../layout/components/Loaders/LoaderTable";
import { isDev } from "../../_ezs/_helpers/AssetsHelpers";
import { getRequestParams } from "../../_ezs/_helpers/RequestHelpers";
import { sleep } from "../../_ezs/_helpers/DelayHelpers";
import TheadTd from "./theadTd/TheadTd";
import StatisticalFilters from "./StatisticalFilters/StatisticalFilters";

const data = [
  {
    ID: 1,
    Title: "Nộp bài K7 Sử dụng internet thông minh tiết 1	",
  },
  {
    ID: 2,
    Title: "Nộp bài K7 Sử dụng internet thông minh tiết 2	",
  },
  {
    ID: 3,
    Title: "Nộp bài K7 Sử dụng internet thông minh tiết 3",
  },
  {
    ID: 4,
    Title: "Nộp Poster K7 Sử dụng internet thông minh	",
  },
  {
    ID: 5,
    Title: "THCS - TEAM ONL - Nộp video quay K7 internet tiết 1	",
  },
  {
    ID: 6,
    Title: "THCS - TEAM ONL - Nộp video quay K7 internet tiết 2",
  },
];

function StatisticalPage(props) {
  const [listStatis, setListStatis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    filter2: {
      Key: "",
    },
    Pi: 1,
    Ps: 10,
  });
  const [elmHead, setElmHead] = useState(0);

  const retrieveStatistical = async () => {
    !loading && setLoading(true);
    const params = getRequestParams(filters);

    try {
      await sleep(1000);
      console.log(params);
      setListStatis(data);
      setLoading(false);
      setFilters(filters);
    } catch (error) {
      console.log(error);
    }

    // MissionReportCrud.getListMissionRp(params)
    //   .then((response) => {
    //     if (response.error) {
    //       showErrorPermiss(response.error);
    //     } else {
    //       const { list, total } = response.data;
    //       setPageTotal(total);
    //       setListMission(list);
    //     }
    //     setLoading(false);
    //   })
    //   .catch(({ response }) => {
    //     showErrorPermiss(response.error);
    //   });
  };

  useEffect(() => {
    retrieveStatistical();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const updateElmHead = (height) => {
    setElmHead(height);
  };

  return (
    <div className={`container-fluid ${!isDev() ? "p-0" : ""}`}>
      <div className="hpanel">
        <div className="panel-body">
          <div className="d-flex">
            <h2 className="font-light m-b-xs tb-head-title">Thống kê</h2>
          </div>
        </div>
      </div>
      <div className="hpanel hgreen">
        <div className="panel-heading hbuilt">Danh sách</div>
        <div className="panel-body overflow-revert">
          <StatisticalFilters loading={loading} initialValues={{}} />
          {loading && <LoaderTable text="Đang tải thống kê ..." />}
          {!loading && (
            <div className="d-flex align-items-baseline">
              <div className="w-425px">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr
                      style={{
                        height: `${elmHead}px`,
                      }}
                    >
                      <th
                        className="text-center vertical-align-middle"
                        colSpan={4}
                      >
                        Giáo viên
                      </th>
                    </tr>
                    <tr className="bg-gray-100">
                      <th className="text-center">Mã</th>
                      <th>Tên giáo viên</th>
                      <th className="text-center">TĐ</th>
                      <th className="text-center border-right-0">TB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">GV01</td>
                      <td>Nguyễn Tài Tuấn</td>
                      <td className="text-center">120</td>
                      <td className="text-center">80</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex-1">
                <div className="react-bootstrap-table table-responsive style-scrollbar pb-2">
                  <table className="table table-bordered mb-0 border-left-0">
                    <thead>
                      <tr>
                        {listStatis &&
                          listStatis.map((item, index) => (
                            <TheadTd
                              key={index}
                              index={index}
                              item={item}
                              updateElmHead={updateElmHead}
                            />
                          ))}
                      </tr>
                      <tr className="bg-gray-100">
                        {listStatis &&
                          listStatis.map((item, index) => (
                            <React.Fragment key={index}>
                              <th
                                className={`text-center ${
                                  index === 0 && "border-left-0"
                                }`}
                              >
                                SL : 100
                              </th>
                              <th className="text-center">Nộp : 50</th>
                              <th className="text-center">Chấm : 50</th>
                            </React.Fragment>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {listStatis &&
                          listStatis.map((item, index) => (
                            <React.Fragment key={index}>
                              <td
                                key={index}
                                colSpan={3}
                                className={`text-center ${
                                  index === 0 && "border-left-0"
                                }`}
                              >
                                1
                              </td>
                            </React.Fragment>
                          ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="panel-footer d-flex justify-content-between bg-white py-5">
          <div className="line-height-md">
            <span>
              <b className="font-weight-boldest">TĐ</b> : Tổng điểm
            </span>
            <span className="pl-5">
              <b className="font-weight-boldest">TB</b> : Trung bình
            </span>
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center">
              <div className="w-12px h-12px border rounded-circle"></div>
              <div className="ml-2 line-height-md">Không được giao</div>
            </div>
            <div className="d-flex align-items-center ml-8">
              <div className="w-12px h-12px border border-danger bg-danger rounded-circle"></div>
              <div className="ml-2 line-height-md">Được giao chưa nộp</div>
            </div>
            <div className="d-flex align-items-center ml-8">
              <div className="w-12px h-12px border border-success bg-success rounded-circle"></div>
              <div className="ml-2 line-height-md">Đã nộp</div>
            </div>
            <div className="d-flex align-items-center ml-8">
              <div className="w-12px h-12px border border-primary bg-primary rounded-circle"></div>
              <div className="ml-2 line-height-md">Đã chấm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticalPage;
