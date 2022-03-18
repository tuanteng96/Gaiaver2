export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;
export const toAbsoluteUrlSv = pathname => process.env.REACT_APP_API_URL + pathname;
export const isDev = () =>
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";