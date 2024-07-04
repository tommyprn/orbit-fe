import { stringify } from 'qs';

// const API_URL = 'http://10.55.54.161:30090/api/v1/';
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

export const getAllLedReport = (selCase, year, array, selected) => {
  const queryString = stringify(
    {},
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

    const requestBody = {
      tahun: year,
      cabang: selected === 'branch' && array.length > 0 ? array : null,
      region: selected === 'region' && array.length > 0 ? array : null,
      filter: selCase,
      unitKerja: selected === 'division' && array.length > 0 ? array : null,
      direktorat: selected === 'directorate' && array.length > 0 ? array : null,
    };

    try {
      const res = await fetch(API_URL + `get-filter?` + queryString, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
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
