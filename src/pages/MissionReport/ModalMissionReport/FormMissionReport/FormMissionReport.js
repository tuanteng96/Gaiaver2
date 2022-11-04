import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik, FieldArray } from "formik";
import PropTypes from "prop-types";

import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

FormMissionReport.propTypes = {
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.object,
  isLoading: PropTypes.bool,
};

const initialValue = {
  ID: 0,
  TaskID: "",
  Title: "",
  Desc: "",
  FilesJson: [
    {
      link: "",
      desc: "",
    },
  ],
};

Yup.addMethod(Yup.array, "checkEmpty", function (errorMessage) {
  return this.test(`test-array`, errorMessage, function (value) {
    const { originalValue } = this;
    return (
      originalValue &&
      originalValue.some((file) => {
        if (typeof file === "object") {
          return file.link && file.link.length > 0;
        } else {
          return file && file.length > 0;
        }
      })
    );
  });
});

const missionSchema = Yup.object().shape({
  FilesJson: Yup.array().checkEmpty("Trống").required(),
});

function FormMissionReport({ onSubmit, defaultValue, isLoading, Points }) {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues(() => ({
      ...initialValue,
      TaskID: defaultValue.ID,
    }));
  }, [defaultValue]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={missionSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formikProps) => {
        const { values, touched, errors, handleChange, handleBlur } =
          formikProps;

        return (
          <Form>
            <div className="py-8 px-3">
              <h3 className="text-uppercase font-size-lg mb-5 font-weight-boldest mt-0">
                Nộp báo cáo
              </h3>
              {/* <div className="form-group mb-5">
                <label>
                  Tên báo cáo <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.Title && touched.Title
                      ? "is-invalid solid-invalid"
                      : ""
                  }`}
                  placeholder="Nhập tên báo cáo"
                  name="Title"
                  value={values.Title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div> */}
              <div className="form-group mb-5">
                <label>Mô tả</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Nhập mô tả"
                  rows={3}
                  name="Desc"
                  value={values.Desc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="form-group mb-5">
                <label>Link báo cáo</label>
                <FieldArray
                  name="FilesJson"
                  render={(arrayHelpers) => (
                    <React.Fragment>
                      {values.FilesJson &&
                        values.FilesJson.map((file, index) => (
                          <div className="input-group mt-2" key={index}>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.FilesJson && touched.FilesJson
                                  ? "is-invalid solid-invalid"
                                  : ""
                              }`}
                              placeholder="Nhập đường dẫn"
                              name={`FilesJson.${index}.link`}
                              value={file.link}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              autoComplete="off"
                            />
                            {index === 0 && (
                              <div className="input-group-append">
                                <button
                                  className="btn btn-primary w-45px"
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")}
                                >
                                  <i className="fal fa-plus-hexagon pr-0"></i>
                                </button>
                              </div>
                            )}
                            {values.FilesJson.length > 1 && index !== 0 && (
                              <div className="input-group-append">
                                <button
                                  className="btn btn-danger w-45px"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <i className="fal fa-trash-alt pr-0"></i>
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                    </React.Fragment>
                  )}
                />
              </div>

              {/* {moment().isAfter(defaultValue.DeadLine) && (
                <div className="mb-5">
                  Báo cáo đã
                  <code className="font-weight-bolder">hết hạn nộp</code>, bạn
                  không thể nộp báo cáo. Liên hệ
                  <code className="py-1">Quản trị viên</code>nếu bạn cần hỗ trợ.
                </div>
              )} */}

              <button
                className={`btn btn-gaia font-size-lg py-3 w-auto ${
                  isLoading
                    ? "spinner spinner-white spinner-right pl-6 disabled"
                    : "px-6"
                } ${
                  Points
                    ? "disabled"
                    : ""
                }`}
                type="submit"
              >
                Gửi báo cáo
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormMissionReport;
