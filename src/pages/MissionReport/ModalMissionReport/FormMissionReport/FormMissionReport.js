import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik, FieldArray } from "formik";
import PropTypes from "prop-types";

FormMissionReport.propTypes = {
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.object,
  isLoading: PropTypes.bool,
};

const initialValue = {
  ID: 0,
  TaskID: 1,
  Title: "",
  Desc: "",
  FilesJson: [
    {
      link: "",
      desc: "",
    },
  ],
};

const missionSchema = Yup.object().shape({
  Title: Yup.string().required("Vui lòng nhập tên báo cáo."),
});

function FormMissionReport({ onSubmit, defaultValue, isLoading }) {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues(() => ({
      ...initialValue,
      ID: defaultValue.ID,
      TaskID: defaultValue.TaskGroupID,
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
              <div className="form-group mb-5">
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
              </div>
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
                              className="form-control"
                              placeholder="Nhập đường dẫn"
                              name={`FilesJson.${index}`}
                              value={file.desc}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {values.FilesJson.length - 1 === index && (
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
                            {values.FilesJson.length > 1 &&
                              values.FilesJson.length - 1 !== index && (
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
              <button
                className={`btn btn-gaia font-size-lg py-3 w-auto ${
                  isLoading
                    ? "spinner spinner-white spinner-right pl-6 disabled"
                    : "px-6"
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
