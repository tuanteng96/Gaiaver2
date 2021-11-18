import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function MissionPage(props) {
  //const [listMission, setlistMission] = useState (null);
  const { MachineCode, Token } = useSelector(({ teaching }) => ({
    Token: teaching.Token, // lấy trong store.js
    MachineCode: teaching.MachineCode,
  }));
  //const dispatch = useDispatch ();

  useEffect(() => {
    if (Token && MachineCode) {
      // loginMechine();
    } else {
      Swal.fire({
        title: "Cảnh báo truy cập",
        text: "Chức năng chỉ cho phép duy nhất một máy tính truy cập. Nếu đây là máy tính cá nhân sẽ sử dụng đê dạy học Online vui lòng xác nhận để bắt đầu sử dụng!",
        icon: "warning",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        reverseButtons: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
      });
    }
    return () => {
      Swal.fire({
        title: "Đăng ký thành công.",
        text: "Hệ thống đã ghi nhận và cho phép máy tính này truy cập chức năng: Dạy học Online",
        icon: "success",
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        allowOutsideClick: false,
      });
    };
  }, [Token, MachineCode]);

  return <div></div>;
}

MissionPage.propTypes = {};

export default MissionPage;
