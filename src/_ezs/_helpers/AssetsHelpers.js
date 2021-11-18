export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;
export const isDev = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return true;
  }
  return false;
};
