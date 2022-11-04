import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LayoutSplashScreen } from "../../../layout/_core/EzsSplashScreen";
import { setMachineUser, setToken, setUserInfo } from "./authSlice";

// window.Info = { User: { ID: 1 } };
// window.Token =
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoMlR5cGUiOiJVc2VyRW50IiwiSUQiOiIxIiwiVG9rZW5JZCI6IjQ4NTIiLCJuYmYiOjE2Njc1NzYzMTQsImV4cCI6MTY2ODE4MTExNCwiaWF0IjoxNjY3NTc2MzE0fQ.TuKcruMxpu71ykkclpshFNWiqvXjpP4s2BmRpwdYZUI';
// window.User = {
//   MachineKey: "mj5WBF0JDwc4R9apHmya",
// };

function AuthInit(props) {
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // We should request user by authToken before rendering the application

  const requestUser = async () => {
    function checkInfo(fn) {
      if (!window.Info && !window.Info) {
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
      // dispatch(setToken(window.Token));
      // dispatch(setUserInfo(window.Info));
      // dispatch(setMachineUser(window.User.MachineKey));
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
}

export default AuthInit;
