import { stringify } from 'qs';

const API_URL = 'http://10.80.240.45:1933/api/v1/';

export const FETCH_FORM_LED_REQUEST = 'FETCH_FORM_LED_REQUEST';
export const FETCH_FORM_LED_SUCCESS = 'FETCH_FORM_LED_SUCCESS';
export const FETCH_FORM_LED_FAILURE = 'FETCH_FORM_LED_FAILURE';

export const fetchFormLedStart = () => ({
  type: FETCH_FORM_LED_REQUEST,
});

export const fetchFormLedSuccess = (data) => ({
  type: FETCH_FORM_LED_SUCCESS,
  payload: data,
});

export const fetchFormLedFailure = (error) => ({
  type: FETCH_FORM_LED_FAILURE,
  payload: error,
});

export const createFormLed = (payload, user) => {
  const queryString = stringify(
    {},
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchFormLedStart());

    const requestHeaders = {
      Authorization: 'Bearer ac',
    };

    const formData = new FormData();

    formData.append('ssl', payload.costCentre);
    formData.append('nip', user.nip);
    formData.append('dampak', payload.impact);
    formData.append('kronologi', payload.chronology);
    formData.append('aktivitas', payload.caseCategory);
    formData.append('tanggalLapor', payload.reportDate);
    formData.append('sumberRecovery', payload.recoverySource);
    formData.append('statusKejadian', payload.caseStatus);
    formData.append('tanggalKejadian', payload.incidentDate);
    formData.append('potensiKerugian', payload.potentialLoss);
    formData.append('nominalRecovery', payload.recoveryAmount);
    formData.append('penyebabKejadian', payload.caseCause);
    formData.append('kronologiSingkat', payload.brief);
    formData.append('tanggalIdentifikasi', payload.identifiedDate);
    formData.append('nominalRealisasiKerugian', payload.actualLoss);
    payload.actionPlan.forEach((action, index) => {
      Object.entries(action).forEach(([actionKey, actionValue]) => {
        if (actionKey === 'file' && actionValue !== '') {
          formData.append(`actionPlans[${index}].multipartFile`, actionValue);
        } else if (actionKey === 'email') {
          formData.append(`actionPlans[${index}].email`, actionValue);
        } else if (actionKey === 'plan') {
          formData.append(`actionPlans[${index}].actionPlan`, actionValue);
        } else if (actionKey === 'targetDate') {
          formData.append(`actionPlans[${index}].targetPenyelesaian`, actionValue);
        } else if (actionKey === 'workUnit') {
          formData.append(`actionPlans[${index}].unitKerja`, actionValue);
        } else {
          formData.append(`actionPlans[${index}].penanggungJawab`, actionValue);
        }
      });
    });

    try {
      const res = await fetch(API_URL + `save-form-led?` + queryString, {
        method: 'POST',
        headers: requestHeaders,
        body: formData,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchFormLedSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchFormLedFailure(err));
    }
  };
};

export const editFormLed = (payload) => {
  const queryString = stringify(
    {},
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchFormLedStart());

    const requestHeaders = {
      Authorization: 'Bearer ac',
    };

    const formData = new FormData();
    formData.append('ssl', payload.costCentre);
    formData.append('dampak', payload.impact);
    formData.append('idLaporan', payload.id);
    formData.append('kronologi', payload.chronology);
    formData.append('aktivitas', payload.caseCategory);
    formData.append('tanggalLapor', payload.reportDate);
    formData.append('statusKejadian', payload.caseStatus);
    formData.append('sumberRecovery', payload.recoverySource);
    formData.append('tanggalKejadian', payload.incidentDate);
    formData.append('potensiKerugian', payload.potentialLoss);
    formData.append('nominalRecovery', payload.recoveryAmount);
    formData.append('kronologiSingkat', payload.brief);
    formData.append('penyebabKejadian', payload.caseCause);
    formData.append('tanggalIdentifikasi', payload.identifiedDate);
    formData.append('nominalRealisasiKerugian', payload.actualLoss);
    payload.actionPlan.forEach((action, index) => {
      Object.entries(action).forEach(([actionKey, actionValue]) => {
        if (actionKey === 'file' && typeof actionValue !== 'string') {
          formData.append(`actionPlans[${index}].multipartFile`, actionValue);
        } else if (actionKey === 'email') {
          formData.append(`actionPlans[${index}].email`, actionValue);
        } else if (actionKey === 'plan') {
          formData.append(`actionPlans[${index}].actionPlan`, actionValue);
        } else if (actionKey === 'targetDate') {
          formData.append(`actionPlans[${index}].targetPenyelesaian`, actionValue);
        } else if (actionKey === 'workUnit') {
          formData.append(`actionPlans[${index}].unitKerja`, actionValue.id);
        } else if (actionKey === 'PIC') {
          formData.append(`actionPlans[${index}].penanggungJawab`, actionValue);
        } else if (actionKey === 'id') {
          formData.append(`actionPlans[${index}].idActionPlan`, actionValue);
        }
      });
    });
    try {
      const res = await fetch(API_URL + `update-form-led?` + queryString, {
        method: 'PUT',
        headers: requestHeaders,
        body: formData,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchFormLedSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchFormLedFailure(err));
    }
  };
};

export const getAllList = (pagination, keyword, role) => {
  const queryString = stringify(
    {
      role: role,
      pageSize: pagination?.perPage,
      idLaporan: keyword,
      pageNumber: pagination?.page,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchFormLedStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-form-led?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchFormLedSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchFormLedFailure(err));
    }
  };
};

export const getAllInbox = (pagination, keyword, role) => {
  const queryString = stringify(
    {
      role: role,
      pageSize: pagination?.perPage,
      idLaporan: keyword,
      pageNumber: pagination?.page,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchFormLedStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-form-led-pending?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchFormLedSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchFormLedFailure(err));
    }
  };
};

export const FETCH_ONE_FORM_LED_REQUEST = 'FETCH_ONE_FORM_LED_REQUEST';
export const FETCH_ONE_FORM_LED_SUCCESS = 'FETCH_ONE_FORM_LED_SUCCESS';
export const FETCH_ONE_FORM_LED_FAILURE = 'FETCH_FORM_LED_FAILURE';

export const fetchOneFormLedStart = () => ({
  type: FETCH_ONE_FORM_LED_REQUEST,
});

export const fetchOneFormLedSuccess = (data) => ({
  type: FETCH_ONE_FORM_LED_SUCCESS,
  payload: data,
});

export const fetchOneFormLedFailure = (error) => ({
  type: FETCH_ONE_FORM_LED_FAILURE,
  payload: error,
});

export const getOneFormLed = (id) => {
  const queryString = stringify(
    {
      id,
      // nip: payload?.nip,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchOneFormLedStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-laporan-led?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();

      if (res.status === 200) {
        dispatch(fetchOneFormLedSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchOneFormLedFailure(err));
    }
  };
};
