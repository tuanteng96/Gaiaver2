import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LayoutSplashScreen } from "../../../layout/_core/EzsSplashScreen";
import { setMachineUser, setToken, setUserInfo } from "./authSlice";

// window.Info = { User: { ID: 3803 } };
// window.Token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoMlR5cGUiOiJVc2VyRW50IiwiSUQiOiIxIiwiVG9rZW5JZCI6IjM2IiwibmJmIjoxNjYwMDE5MTQ4LCJleHAiOjE2NjA2MjM5NDgsImlhdCI6MTY2MDAxOTE0OH0.nEVDDB8dKJyCvdcN1L6mMUtQUq6C1FcJOIM3bhn4nV8";
// window.User = {
//   MachineKey: "mj5WBF0JDwc4R9apHmya",
// };

function AuthInit(props) {
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // We should request user by authToken before rendering the application

  const requestUser = async () => {
    function checkInfo(fn) {
      if (!window.Info || !window.Info) {
        setTimeout(() => {
          checkInfo(fn);
        }, 50);
      } else {
        fn();
      }
    }
    checkInfo(() => {
      dispatch(setToken(window.Token));
      dispatch(setUserInfo(window.Info));
      dispatch(setMachineUser(window.User.MachineKey));
      setShowSplashScreen(false);
    });
  };

  useEffect(() => {
    if (!window.Token || !window.Info) {
      // Xử lí
      requestUser();
    } else {
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
}

export default AuthInit;
