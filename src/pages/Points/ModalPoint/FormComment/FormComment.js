import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";

FormComment.propTypes = {
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.object,
};

const initialValue = {
  ID: null,
  Comment: "",
};

function FormComment({ onSubmit, defaultValue }) {
  const [initialValues, setInitialValues] = useState({});

  const { LoadingBtn } = useSelector((state) => state.point);

  useEffect(() => {
    setInitialValues(() => ({
      ...initialValue,
      ID: defaultValue.ID,
    }));
  }, [defaultValue]);

  const CommentSchema = Yup.object().shape({
    Comment: Yup.string().required("Vui lòng nhập comment"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CommentSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formikProps) => {
        const { values, touched, errors, handleChange, handleBlur } =
          formikProps;
        return (
          <Form>
            <div className="mb-8">
              <div className="form-group mb-5">
                <textarea
                  type="text"
                  placeholder="Nhập nội dung"
                  name="Comment"
                  className={`form-control min-h-130px ${
                    errors.Comment && touched.Comment
                      ? "is-invalid solid-invalid"
                      : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Comment}
                />
              </div>
              <button
                className={`btn btn-gaia font-weight-boldest w-auto ${
                  LoadingBtn.Comment
                    ? "spinner spinner-white spinner-right pl-6 disabled"
                    : "px-6"
                }`}
                type="submit"
              >
                Gửi phản hồi
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormComment;
