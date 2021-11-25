import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { useWindowSize } from "../../hook/useResize";
import { default as DatePicker2 } from "react-mobile-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

DateTimePicker.propTypes = {
  theme: PropTypes.string,
  placeholderText: PropTypes.string,
};
DateTimePicker.defaultProps = {
  theme: "ios",
  placeholderText: "",
  headerFormat: "hh:mm DD/MM/YYYY",
  headerType: "Full",
};

function DateTimePicker({
  className,
  selected,
  theme,
  placeholderText,
  onChange,
  headerFormat,
  headerType,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const dateConfig = {
    date: {
      format: "DD",
      caption: "Ngày",
      step: 1,
    },
    month: {
      caption: "Tháng",
      step: 1,
    },
    year: {
      format: "YYYY",
      caption: "Năm",
      step: 1,
    },
  };
  const timeConfig = {
    hour: {
      format: "hh",
      caption: "Giờ",
      step: 1,
    },
    minute: {
      format: "mm",
      caption: "Phút",
      step: 1,
    },
  };
  const dateTimeConfig = (TYPE) => {
    if (TYPE === "Date") {
      return dateConfig;
    }
    if (TYPE === "Time") {
      return timeConfig;
    }
    return { ...timeConfig, ...dateConfig };
  };
  const formatValue = (value, TYPE) => {
    if (!value) return "";
    if (TYPE === "Date") {
      return moment(value).format("DD/MM/YYYY");
    }
    if (TYPE === "Time") {
      return moment(value).format("HH:mm");
    }
    return moment(value).format("DD/MM/YYYY HH:mm");
  };

  if (width > 767) {
    return (
      <DatePicker
        {...props}
        className={className}
        selected={selected}
        headerFormat={headerFormat}
        onChange={(date) => onChange(date)}
        placeholderText={placeholderText}
        autoComplete={"off"}
      />
    );
  }
  return (
    <>
      <input
        className={className}
        value={formatValue(selected, headerType)}
        placeholder={placeholderText}
        readOnly
        onClick={() => setIsOpen(true)}
      />
      <DatePicker2
        showCaption={true}
        dateConfig={dateTimeConfig(headerType)}
        value={selected ? selected : new Date()}
        isOpen={isOpen}
        onSelect={(date) => {
          onChange(date);
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
        theme={theme}
        headerFormat={headerFormat}
        cancelText="Đóng"
        confirmText="Lưu"
      />
    </>
  );
}

export default DateTimePicker;
