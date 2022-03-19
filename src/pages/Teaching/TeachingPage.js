import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import { setMachine } from "../Auth/_redux/authSlice";
import TeachingCrud from "./_redux/teachingCrud";
import TeachingList from "./TeachingList/TeachingList";
import "../../_ezs/_assets/sass/pages/teaching/_teaching.scss";

const delay = 5;

const fpPromise = FingerprintJS.load({
  token: window.MachineToken || process.env.REACT_APP_TOKEN_FB,
});

function TeachingPage(props) {
  const [ShowTeaching, setShowTeaching] = useState(false);
  const { MachineCode, MachineUser, Token } = useSelector(({ auth }) => ({
    Token: auth.Token, // lấy trong store.js
    MachineCode: auth.MachineCode,
    MachineUser: auth.MachineUser,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      checkMechine();
    }, delay * 60 * 1000);

    return () => clearInterval(interval); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Token && MachineUser) {
      loginMechine();
    } else {
      Swal.fire({
        title: "Cảnh báo truy cập",
        text:
          "Chức năng chỉ cho phép duy nhất một máy tính truy cập. Nếu đây là máy tính cá nhân sẽ sử dụng đê dạy học Online vui lòng xác nhận để bắt đầu sử dụng!",
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
        preConfirm: function() {
          // Là function và return  ra Promise
          return new Promise(function(resolve, reject) {
            // sử lý lấy token trên máy
            fpPromise
              .then((fp) => fp.get())
              .then(async (result) => {
                const { visitorId } = result;
                try {
                  // Fech Api
                  const { error } = await TeachingCrud.checkMachine({
                    MachineKey: visitorId,
                  });
                  if (!error) {
                    const action = setMachine(visitorId);
                    dispatch(action);

                    Swal.fire({
                      title: "Đăng ký thành công.",
                      text:
                        "Hệ thống đã ghi nhận và cho phép máy tính này truy cập chức năng: Dạy học Online",
                      icon: "success",
                      customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger",
                      },
                      allowOutsideClick: false,
                    });
                    setShowTeaching(true);
                  } else {
                    SwlNotAccess(error);
                  }
                } catch ({ response }) {
                  SwlNotAccess(response.data.error);
                }
              })
              .catch(({ response }) => {
                SwlNotAccess(response.data.error);
              });
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
  }, [Token, MachineCode]); // eslint-disable-line react-hooks/exhaustive-deps

  const loginMechine = async () => {
    //Token, MachineCode không khớp thì chạy try, catch dưới
    if (!MachineCode) {
      fpPromise
        .then((fp) => fp.get())
        .then(async (result) => {
          const { visitorId } = result;
          if (visitorId === MachineUser) {
            const action = setMachine(visitorId);
            dispatch(action);
          } else {
            SwlForbidden();
          }
        });
    } else if (MachineUser !== MachineCode) {
      SwlForbidden();
    } else {
      try {
        const { error } = await TeachingCrud.checkMachine({
          MachineKey: MachineCode,
        });
        if (error) {
          SwlNotAccess(error);
        } else {
          setShowTeaching(true);
        }
      } catch ({ response }) {
        SwlNotAccess(response.data.error);
      }
    }
  };

  const checkMechine = async () => {
    let newMechine = MachineCode;

    try {
      if (!newMechine) {
        await fpPromise
          .then((fp) => fp.get())
          .then(async (result) => {
            const { visitorId } = result;
            newMechine = visitorId;
            const action = setMachine(visitorId);
            dispatch(action);
          });
      } else {
        const { error } = await TeachingCrud.checkMachine({
          MachineKey: MachineCode,
        });
        if (error) {
          SwlNotAccess(error);
        } else {
          setShowTeaching(true);
          Swal.closeModal();
        }
      }
    } catch ({ response }) {
      SwlNotAccess(response.data.error);
    }
  };

  const SwlNotAccess = (error) => {
    setShowTeaching(false);
    Swal.fire({
      icon: "error",
      title: "Xảy ra lỗi !",
      html: `<div>Không thể đăng ký truy cập cho máy tính này. Vui lòng liên hệ quản trị viên.<div><div class="text-danger font-size-xs font-weight-boldest">ERROR : ${error}</div>`,
      customClass: {
        confirmButton: "btn btn-success",
      },
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
  };

  const SwlForbidden = () => {
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
      preConfirm: function() {
        const val = document.getElementById("val-input").value; // Get value input
        return new Promise(function(resolve, reject) {
          TeachingCrud.sendPermission({ UserDesc: val })
            .then((data) => {
              resolve();
            })
            .catch((error) => console.log(error));
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
      const { isDismissed } = result; //check isDismissed trả về kết quả là gì nếu nó "true" thì chạy lệnh dưới và ngược lại
      if (isDismissed) {
        window.location.href = "/";
      } else {
        // Thông báo đợi cấp
        Swal.fire({
          title: "Yêu cầu cấp quyền truy cập thay thế thành công",
          text:
            "Hệ thống đã tiếp nhận thông tin và đang tiến hành xử lý và phản hồi sớm lại bạn.",
          icon: "info",
          allowOutsideClick: false,
          customClass: {
            confirmButton: "btn btn-success",
          },
        }).then((result) => {
          window.location.href = "/";
        });
      }
    });
  };

  return <Fragment>{ShowTeaching ? <TeachingList /> : ""}</Fragment>;
}

export default TeachingPage;
