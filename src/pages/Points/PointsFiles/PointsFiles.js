import React from "react";
import PropTypes from "prop-types";

PointsFiles.propTypes = {
  file: PropTypes.object,
};

function PointsFiles({ file }) {
  const handleClick = (link) => {
    window.open(link, "_blank")?.focus();
  };

  return (
    <div
      className="d-flex text-dark my-1 text-hover-primary cursor-pointer"
      onClick={() => handleClick(file.link)}
    >
      <i className="fal fa-link mr-2"></i>
      <ins className="text-truncate max-w-400px d-block">{file.link}</ins>
    </div>
  );
}

export default PointsFiles;
