import React, { useState } from "react";
import PointsFiles from "../PointsFiles";
// import PropTypes from 'prop-types';

// PointsListFiles.propTypes = {

// };

function PointsListFiles({ FilesJson }) {
  const [isFull, setIsFull] = useState(false);
  if (isFull) {
    return (
      <div>
        {FilesJson &&
          FilesJson.map((file, index) => <PointsFiles file={file} key={index} />)}
        <div
          className="d-flex align-items-center my-1 text-primary cursor-pointer"
          onClick={() => setIsFull(!isFull)}
        >
          <i className="fal fa-angle-double-right mr-2"></i>
          <ins className="text-truncate max-w-400px d-block">Thu gọn</ins>
        </div>
      </div>
    );
  }
  return (
    <div>
      {FilesJson &&
        FilesJson.filter((item, index) => index < 2).map((file, index) => (
          <PointsFiles file={file} key={index} />
        ))}
      {FilesJson && FilesJson.length > 2 && (
        <div
          className="d-flex align-items-center align-items-center my-1 text-primary cursor-pointer"
          onClick={() => setIsFull(!isFull)}
        >
          <i className="fal fa-angle-double-right mr-2"></i>
          <ins className="text-truncate max-w-400px d-block">Xem thêm</ins>
        </div>
      )}
    </div>
  );
}

export default PointsListFiles;
