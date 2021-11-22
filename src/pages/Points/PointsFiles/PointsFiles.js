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
      className="d-block text-dark my-1 text-hover-primary cursor-pointer"
      onClick={() => handleClick(file.link)}
    >
      <i className="fal fa-link mr-2"></i>
      <ins>{file.link}</ins>
    </div>
  );
}

export default PointsFiles;
