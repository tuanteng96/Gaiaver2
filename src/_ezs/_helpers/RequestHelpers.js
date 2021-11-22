export const getRequestParams = (filters) => {
    let params = {};

    if (filters.Key) {
        params.Key = filters.Key;
    }

    if (filters.Pi) {
        params.pi = filters.Pi;
    }

    if (filters.Ps) {
        params.ps = filters.Ps;
    }

    return params;
};