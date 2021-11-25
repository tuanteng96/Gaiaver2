import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useSize from "@react-hook/size";

TheadTd.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

function TheadTd({ item, index, updateElmHead }) {
  const target = React.useRef(null);
  const [,height] = useSize(target);

  useEffect(() => {
    if (height > 0) {
      updateElmHead(height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSize(target)]);

  return (
    <th
      ref={target}
      className={`text-center min-w-300px vertical-align-middle ${
        index === 0 && "border-left-0"
      }`}
      colSpan={3}
      key={index}
    >
      {item.Title}
    </th>
  );
}

export default TheadTd;
