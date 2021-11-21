import React from "react";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import LoaderTable from "../../layout/components/Loaders/LoaderTable";

BaseTablesCustom.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  options: PropTypes.object,
  loading: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.string,
  keyField: PropTypes.string,
};
BaseTablesCustom.defaultProps = {
  data: null,
  columns: null,
  className: "",
  loading: false,
  options: null,
  classes:
    "table-head-custom table-bordered table-vertical-center overflow-hidden mb-0",
  keyField: "ID",
};

function BaseTablesCustom({
  data,
  columns,
  options,
  loading,
  className,
  classes,
  keyField,
  ...props
}) {
  const onTableChange = (type, { page, sizePerPage }) => {
    //console.log(page);
    //console.log(sizePerPage);
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(options)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <React.Fragment>
              <div className="panel-body">
                <BootstrapTable
                  scrollTop={"Bottom"}
                  bootstrap4
                  wrapperClasses={`table-responsive ${className}`}
                  //rowClasses="text-nowrap"
                  classes={classes}
                  headerClasses="font-weight-boldest"
                  remote={true}
                  bordered={false}
                  keyField={keyField}
                  data={data}
                  columns={columns}
                  onTableChange={onTableChange}
                  noDataIndication={() =>
                    loading ? (
                      <LoaderTable text="Đang tải dữ liệu ..." />
                    ) : (
                      <div>Không có dữ liệu</div>
                    )
                  }
                  {...paginationTableProps}
                  {...props}
                />
              </div>
              <div className="panel-footer">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    Hiển thị
                    <DropdownButton
                      as={ButtonGroup}
                      key="secondary"
                      id={`dropdown-variants-Secondary`}
                      variant=" font-weight-boldest"
                      title={paginationProps.sizePerPage}
                    >
                      {paginationProps.sizePerPageList.map((item, index) => (
                        <Dropdown.Item
                          key={index}
                          eventKey={index}
                          active={
                            paginationProps.sizePerPageList[index] ===
                            paginationProps.sizePerPage
                          }
                          onClick={() =>
                            paginationProps.onSizePerPageChange(
                              paginationProps.sizePerPageList[index]
                            )
                          }
                        >
                          {paginationProps.sizePerPageList[index]}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                    trên trang
                    {/* <SizePerPageDropdownStandalone {...paginationProps} /> */}
                  </div>
                  <Pagination
                    className="my-3"
                    count={Math.ceil(
                      paginationProps.totalSize / paginationProps.sizePerPage
                    )}
                    page={paginationProps.page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={(event, value) => {
                      paginationProps.onPageChange(value);
                    }}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </PaginationProvider>
    </>
  );
}

export default BaseTablesCustom;
