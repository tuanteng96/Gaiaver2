import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, Formik } from "formik";

FormPoint1.propTypes = {
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.object,
};

const initialValue = {
  ID: null,
  Point1: "",
  PointDesc: "",
};

function FormPoint1({ onSubmit, defaultValue }) {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues(() => ({
      ...initialValue,
      ID: defaultValue.ID,
    }));
  }, [defaultValue]);

  const PointSchema = Yup.object().shape({
    Point1: Yup.string().required("Vui lòng nhập số điểm"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PointSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formikProps) => {
        const { values, touched, errors, handleChange, handleBlur } =
          formikProps;
        return (
          <Form>
            <div className="mb-8">
              <div className="form-group mb-0">
                <input
                  type="text"
                  placeholder="Nhập điểm"
                  className={`form-control ${
                    errors.Point1 && touched.Point1
                      ? "is-invalid solid-invalid"
                      : ""
                  }`}
                  name="Point1"
                  value={values.Point1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                />
              </div>
              <div className="form-group mb-5">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Nhập mô tả"
                  rows={3}
                  name="PointDesc"
                  value={values.PointDesc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                />
              </div>
              <button
                className="btn btn-gaia font-weight-boldest"
                // className={`btn btn-gaia font-size-lg py-3 w-auto ${
                //   isLoading
                //     ? "spinner spinner-white spinner-right pl-6 disabled"
                //     : "px-6"
                // }`}
                type="submit"
              >
                Chấm điểm
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormPoint1;
