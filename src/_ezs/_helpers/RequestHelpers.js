export const getRequestParams = (filters) => {
  let params = {};

  if (filters.Key) {
    params.Key = filters.Key;
  }

  if (filters.Pi) {
    params.Pi = filters.Pi;
  }

  if (filters.Ps) {
    params.Ps = filters.Ps;
  }

  return params;
};
