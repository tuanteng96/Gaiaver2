import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import { setMachine } from "./_redux/teachingSlice";

function TeachingPage(props) {
  const [listTeaching, setListTeaching] = useState(null);
  const { MachineCode, Token } = useSelector(({ teaching }) => ({
    Token: teaching.Token,  // lấy trong store.js
    MachineCode: teaching.MachineCode,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (Token && MachineCode) {
      loginMechine();
    } else {
      Swal.fire({
        title: "Cảnh báo truy cập",
        text: "Chức năng chỉ cho phép duy nhất một máy tính truy cập. Nếu đây là máy tính cá nhân sẽ sử dụng đê dạy học Online vui lòng xác nhận để bắt đầu sử dụng!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        reverseButtons: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        showLoaderOnConfirm: true,
        preConfirm: function () { // Là function và return  ra Promise
          return new Promise(function (resolve, reject) { // sử lý lấy token trên máy 
            const fpPromise = FingerprintJS.load({
              token: process.env.REACT_APP_TOKEN_FB,
            });
            fpPromise
              .then((fp) => fp.get())
              .then(async (result) => {
                const { visitorId } = result;
                try {
                  // Fech Api
                  //const data = await teachingApi.adad("");
                  // Get data
                  const action = setMachine(visitorId);
                  dispatch(action);

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
                  setListTeaching([0]);
                } catch (error) {
                  console.log(error);
                }
              })
              .catch((error) => console.log(error));
          });
        },
        allowOutsideClick: false,
      }).then((result) => {
        const { isDismissed } = result;
        if (isDismissed) {
          window.location.href = "/";
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Token, MachineCode]);

  const loginMechine = async () => {
    try {
      //Fech API
      // Get API List bài học
      setListTeaching([0]);
    } catch (error) {
      Swal.fire({
        title: "Truy cập bị cấm",
        html: `<div class="p-1">
        <div class="mb-3">
          Tài khoản của bạn đã đăng ký sử dụng chức năng Dạy học Online trên một
          máy tính khác. Vui lòng sử dụng máy tính đã đăng ký để sử dụng hoặc Yêu
          cầu cấp quyền truy cập thay thế cho máy tính đang sử dụng theo form bên
          dưới
        </div>
        <input
          class="form-control"
          placeholder="Lý do"
          id="val-input"
        />
      </div>`,
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Xin cấp quyền truy cập",
        showLoaderOnConfirm: true,
        preConfirm: function () {
          const val = document.getElementById("val-input").value; // Get value input
          return new Promise(function (resolve, reject) {
            console.log(val);
            //Fech API
            setTimeout(() => {
              resolve();
            }, 1000);
          });
        },
        cancelButtonText: "Đóng",
        reverseButtons: true,
        buttonsStyling: false,
        allowOutsideClick: false,
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
      }).then((result) => {
        // Thông báo đợi cấp
      });
    }
  };

  return <Fragment>{listTeaching ? "Đây là nội dung dạy học" : ""}</Fragment>;
}

export default TeachingPage;
