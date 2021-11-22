import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import TeachingList from "../TeachingList";

ModalTeaching.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  defaultValue: PropTypes.object,
};

export default function ModalTeaching({ show, onHide }) {
  console.log(onHide);
  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-fullscreen">
      <Modal.Header closeButton>
        <Modal.Title>Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <TeachingList >
            
          </TeachingList>
      </Modal.Body>
    </Modal>
  );
}
