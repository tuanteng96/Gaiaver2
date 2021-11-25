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
  Status: "user"
};

function FormComment({ onSubmit, defaultValue }) {
  const [initialValues, setInitialValues] = useState({});

  const { LoadingBtn } = useSelector((state) => state.point);

  useEffect(() => {
    if (defaultValue) {
      setInitialValues(() => ({
        ...initialValue,
        ID: defaultValue.ID,
      }));
    }
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
            <div className="form-group mb-3 d-flex align-items-end">
              <textarea
                name="Comment"
                className={`form-control ${
                  errors.Comment && touched.Comment
                    ? "is-invalid solid-invalid"
                    : ""
                }`}
                rows={1}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Comment}
              ></textarea>
              <button
                className={`btn btn-primary min-w-150px ml-3 ${
                  LoadingBtn.Comment
                    ? "spinner spinner-white spinner-right disabled"
                    : ""
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
