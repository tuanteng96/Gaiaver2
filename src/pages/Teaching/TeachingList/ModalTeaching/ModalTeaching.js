import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

ModalTeaching.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  defaultValues: PropTypes.object,
};

export default function ModalTeaching({ show, onHide, defaultValues }) {
  if (!defaultValues || Object.keys(defaultValues).length === 0) return "";
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-fullscreen"
      contentClassName="rounded-0"
    >
      <Modal.Body className="px-30">
        <div
          className="position-absolute right-0 top-0 cursor-pointer zindex-2 w-80px h-80px d-flex align-items-center justify-content-center"
          onClick={onHide}
        >
          <i className="fal fa-times icon-2x text-dark-75"></i>
        </div>
        {defaultValues.type === "LessonKTT" && (
          <embed
            src={defaultValues.LessonKTT}
            type="application/pdf"
            className="w-100 h-100"
          ></embed>
        )}
        {defaultValues.type === "LessonGA" && (
          <embed
            src={defaultValues.LessonGA}
            type="application/pdf"
            className="w-100 h-100"
          ></embed>
        )}
        {defaultValues.type === "LessonBG" && (
          <iframe
            title={defaultValues.LessonBG}
            src={defaultValues.LessonBG}
            frameBorder="0"
            scrolling="auto"
            className="w-100 h-100"
          ></iframe>
        )}
      </Modal.Body>
    </Modal>
  );
}
