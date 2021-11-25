import _ from "lodash";

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

    if (filters.filter2) {
        let filter2 = {};
        if (filters.filter2.TaskGroupID) {
            filter2.TaskGroupID = filters.filter2.TaskGroupID;
        }
        if (filters.filter2.TaskID) {
            filter2.TaskID = filters.filter2.TaskID;
        }
        if (filters.filter2.TaskIDs && filters.filter2.TaskIDs.length > 0) {
            filter2.TaskIDs = filters.filter2.TaskIDs.map(item => item.ID);
        }
        if (filters.filter2.UserID) {
            filter2.UserID = filters.filter2.UserID;
        }
        if (filters.filter2.From) {
            filter2.From = filters.filter2.From;
        }
        if (filters.filter2.To) {
            filter2.To = filters.filter2.To;
        }
        if (filters.filter2.Method) {
            filter2.Method = filters.filter2.Method;
        }
        if (filters.filter2.Status) {
            filter2.Status = filters.filter2.Status;
        }
        if (!_.isEmpty(filter2)) {
            params.filter2 = filter2;
        }
    }

    return params;
};