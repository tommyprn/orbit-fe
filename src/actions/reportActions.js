import { stringify } from 'qs';

// const API_URL ='http://10.55.54.161:30090/api/v1/'
const API_URL =
  process.env.REACT_APP_DEPLOY_STATE === 'true'
    ? 'http://10.55.54.161:30090/api/v1/'
    : 'http://10.80.240.45:1933/api/v1/';

export const FETCH_REPORT_REQUEST = 'FETCH_REPORT_REQUEST';
export const FETCH_REPORT_SUCCESS = 'FETCH_REPORT_SUCCESS';
export const FETCH_REPORT_FAILURE = 'FETCH_REPORT_FAILURE';

export const fetchReportRequest = () => ({
  type: FETCH_REPORT_REQUEST,
});

export const fetchReportSuccess = (data) => ({
  type: FETCH_REPORT_SUCCESS,
  payload: data,
});

export const fetchReportFailure = (error) => ({
  type: FETCH_REPORT_FAILURE,
  payload: error,
});

export const getAllLedReport = (selCase, year, fil, isRegion) => {
  const queryString = stringify(
    {
      tahun: year,
      cabang: isRegion ? null : fil,
      region: isRegion ? fil : null,
      filter: selCase,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchReportRequest());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-filter?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchReportSuccess(responseJSON.data));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchReportFailure(err));
    }
  };
};

export const FETCH_ZERO_REPORT_REQUEST = 'FETCH_ZERO_REPORT_REQUEST';
export const FETCH_ZERO_REPORT_SUCCESS = 'FETCH_ZERO_REPORT_SUCCESS';
export const FETCH_ZERO_REPORT_FAILURE = 'FETCH_ZERO_REPORT_FAILURE';

export const fetchZeroReportRequest = () => ({
  type: FETCH_ZERO_REPORT_REQUEST,
});

export const fetchZeroReportSuccess = (data) => ({
  type: FETCH_ZERO_REPORT_SUCCESS,
  payload: data,
});

export const fetchZeroReportFailure = (error) => ({
  type: FETCH_ZERO_REPORT_FAILURE,
  payload: error,
});

export const getAllOfficeReport = (month, keyword) => {
  const queryString = stringify(
    {
      bulan: month,
      keyword: keyword,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchZeroReportRequest());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-report-nihil?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchZeroReportSuccess(responseJSON.data));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchZeroReportFailure(err));
    }
  };
};

export const FETCH_POTENTIAL_LOSS_REPORT_REQUEST = 'FETCH_POTENTIAL_LOSS_REPORT_REQUEST';
export const FETCH_POTENTIAL_LOSS_REPORT_SUCCESS = 'FETCH_POTENTIAL_LOSS_REPORT_SUCCESS';
export const FETCH_POTENTIAL_LOSS_REPORT_FAILURE = 'FETCH_POTENTIAL_LOSS_REPORT_FAILURE';

export const fetchPotentialLossReportRequest = () => ({
  type: FETCH_POTENTIAL_LOSS_REPORT_REQUEST,
});

export const fetchPotentialLossReportSuccess = (data) => ({
  type: FETCH_POTENTIAL_LOSS_REPORT_SUCCESS,
  payload: data,
});

export const fetchPotentialLossReportFailure = (error) => ({
  type: FETCH_POTENTIAL_LOSS_REPORT_FAILURE,
  payload: error,
});

export const getAllPotentialLossReport = (month) => {
  const queryString = stringify(
    { bulan: month },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchPotentialLossReportRequest());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-report-potensi-kerugian?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchPotentialLossReportSuccess(responseJSON.data));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchPotentialLossReportFailure(err));
    }
  };
};

export const FETCH_ACTUAL_LOSS_REPORT_REQUEST = 'FETCH_ACTUAL_LOSS_REPORT_REQUEST';
export const FETCH_ACTUAL_LOSS_REPORT_SUCCESS = 'FETCH_ACTUAL_LOSS_REPORT_SUCCESS';
export const FETCH_ACTUAL_LOSS_REPORT_FAILURE = 'FETCH_ACTUAL_LOSS_REPORT_FAILURE';

export const fetchActualLossReportRequest = () => ({
  type: FETCH_ACTUAL_LOSS_REPORT_REQUEST,
});

export const fetchActualLossReportSuccess = (data) => ({
  type: FETCH_ACTUAL_LOSS_REPORT_SUCCESS,
  payload: data,
});

export const fetchActualLossReportFailure = (error) => ({
  type: FETCH_ACTUAL_LOSS_REPORT_FAILURE,
  payload: error,
});

export const getAllActualLossReport = (month) => {
  const queryString = stringify(
    { bulan: month },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchActualLossReportRequest());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-report-realisasi-kerugian?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchActualLossReportSuccess(responseJSON.data));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchActualLossReportFailure(err));
    }
  };
};

export const FETCH_IRM_HISTORY_REQUEST = 'FETCH_IRM_HISTORY_REQUEST';
export const FETCH_IRM_HISTORY_SUCCESS = 'FETCH_IRM_HISTORY_SUCCESS';
export const FETCH_IRM_HISTORY_FAILURE = 'FETCH_IRM_HISTORY_FAILURE';
export const FETCH_DETAILED_HISTORY_LED_SUCCESS = 'FETCH_DETAILED_HISTORY_LED_SUCCESS';

export const fetchIrmHistoryRequest = () => ({
  type: FETCH_IRM_HISTORY_REQUEST,
});

export const fetchIrmHistorySuccess = (data) => ({
  type: FETCH_IRM_HISTORY_SUCCESS,
  payload: data,
});

export const fetchIrmHistoryFailure = (error) => ({
  type: FETCH_IRM_HISTORY_FAILURE,
  payload: error,
});

export const fetchDetailedIrmHistorySuccess = (data) => ({
  type: FETCH_DETAILED_HISTORY_LED_SUCCESS,
  payload: data,
});

export const getAllIrmActionReport = (startDate, endDate) => {
  const queryString = stringify(
    {
      startDate: startDate,
      endDate: endDate,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchIrmHistoryRequest());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-history-irm?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchIrmHistorySuccess(responseJSON.data));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchIrmHistoryFailure(err));
    }
  };
};

export const getOneIrmActionReport = (id) => {
  const queryString = stringify(
    {
      id,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchIrmHistoryRequest());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-history-irm-detail?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();

      if (res.status === 200) {
        dispatch(fetchDetailedIrmHistorySuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchIrmHistoryFailure(err));
    }
  };
};

export const FETCH_ALL_REPORT_REQUEST = 'FETCH_ALL_REPORT_REQUEST';
export const FETCH_ALL_REPORT_SUCCESS = 'FETCH_ALL_REPORT_SUCCESS';
export const FETCH_ALL_REPORT_FAILURE = 'FETCH_ALL_REPORT_FAILURE';
export const FETCH_ALL_ACTION_PLAN_REPORT_SUCCESS = 'FETCH_ALL_ACTION_PLAN_REPORT_SUCCESS';

export const fetchAllReportRequest = () => ({
  type: FETCH_ALL_REPORT_REQUEST,
});

export const fetchAllReportSuccess = (data) => ({
  type: FETCH_ALL_REPORT_SUCCESS,
  payload: data,
});

export const fetchAllReportFailure = (error) => ({
  type: FETCH_ALL_REPORT_FAILURE,
  payload: error,
});

export const fetchAllActionPlanReportSuccess = (data) => ({
  type: FETCH_ALL_ACTION_PLAN_REPORT_SUCCESS,
  payload: data,
});

export const getAllDatabaseReport = (start, end) => {
  const queryString = stringify(
    {
      endDate: end,
      startDate: start,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchAllReportRequest());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-report?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchAllReportSuccess(responseJSON.data));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchAllReportFailure(err));
    }
  };
};

export const getAllActionPlanReport = (start, end) => {
  const queryString = stringify(
    {
      endDate: end,
      startDate: start,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchAllReportRequest());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-report-actionplan?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchAllActionPlanReportSuccess(responseJSON.data));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchAllReportFailure(err));
    }
  };
};
