import { stringify } from 'qs';

const API_URL = 'http://10.80.240.45:1933/api/v1/';

export const FETCH_HISTORY_REQUEST = 'FETCH_HISTORY_REQUEST';
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';

export const fetchHistoryRequest = () => ({
  type: FETCH_HISTORY_REQUEST,
});

export const fetchHistorySuccess = (data) => ({
  type: FETCH_HISTORY_SUCCESS,
  payload: data,
});

export const fetchHistoryFailure = (error) => ({
  type: FETCH_HISTORY_FAILURE,
  payload: error,
});

export const getAllHistory = (id) => {
  const queryString = stringify(
    {
      idLaporan: id,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchHistoryRequest());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-history?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        // dispatch(fetchHistorySuccess(responseJSON));
        console.log(responseJSON);
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchHistoryFailure(err));
    }
  };
};
