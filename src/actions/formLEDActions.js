import { stringify } from 'qs';

// const API_URL = 'http://10.55.54.161:30090/api/v1/';
const API_URL =
  process.env.REACT_APP_DEPLOY_STATE === 'true'
    ? 'http://10.55.54.161:30090/api/v1/'
    : 'http://10.80.240.45:1933/api/v1/';

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

    formData.append('nip', user.nip);
    formData.append('role', user.role);
    formData.append('kodeCabang', user.branchCode);
    formData.append('namaInputer', user.name);
    formData.append('emailInputer', user.email);
    formData.append('kodeUnitKerja', user.division);

    formData.append('ssl', payload.costCentre);
    formData.append('dampak', payload.impact);
    formData.append('kronologi', payload.chronology);
    formData.append('aktivitas', payload.caseCategory);
    formData.append('tanggalLapor', payload.reportDate);
    formData.append('tindakLanjut', payload.followUp);
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
          formData.append(`actionPlans[${index}].unitKerja`, actionValue.id);
        } else if (actionKey === 'branch') {
          formData.append(`actionPlans[${index}].cabang`, actionValue.id);
        } else if (actionKey === 'PIC') {
          formData.append(`actionPlans[${index}].penanggungJawab`, actionValue);
        } else {
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

export const editFormLed = (payload, user) => {
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
    formData.append('nip', user.nip);
    formData.append('role', user.role);
    formData.append('kodeCabang', user.branchCode);
    formData.append('namaInputer', user.name);
    formData.append('emailInputer', user.email);
    formData.append('kodeUnitKerja', user.division);

    formData.append('id', payload.id);
    formData.append('ssl', payload.costCentre);
    formData.append('dampak', payload.impact);
    if (payload.reportId) {
      formData.append('idLaporan', payload.reportId);
    }
    formData.append('kronologi', payload.chronology);
    formData.append('aktivitas', payload.caseCategory);
    formData.append('tanggalLapor', payload.reportDate);
    formData.append('tindakLanjut', payload.followUp);
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
        } else if (actionKey === 'branch') {
          formData.append(`actionPlans[${index}].cabang`, actionValue.id);
        } else if (actionKey === 'PIC') {
          formData.append(`actionPlans[${index}].penanggungJawab`, actionValue);
        } else if (actionKey === 'id') {
          formData.append(`actionPlans[${index}].idActionPlan`, actionValue);
        } else if (actionKey === 'isEnable') {
          formData.append(`actionPlans[${index}].isDone`, actionValue);
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

export const createDraftLed = (payload, user) => {
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
    if (payload.id) {
      formData.append('id', payload.id);
    }
    formData.append('ssl', payload.costCentre);
    formData.append('nip', user.nip);
    formData.append('role', user.role);
    formData.append('dampak', payload.impact);
    formData.append('kronologi', payload.chronology);
    formData.append('aktivitas', payload.caseCategory);
    formData.append('kodeCabang', user.branchCode);
    formData.append('namaInputer', user.name);
    formData.append('emailInputer', user.email);
    formData.append('tindakLanjut', payload.followUp);
    formData.append('tanggalLapor', payload.reportDate ? payload.reportDate : new Date());
    formData.append('kodeUnitKerja', user.division);
    formData.append('sumberRecovery', payload.recoverySource);
    formData.append('statusKejadian', payload.caseStatus);
    formData.append('tanggalKejadian', payload.incidentDate ? payload.incidentDate : new Date());
    formData.append('potensiKerugian', payload.potentialLoss);
    formData.append('nominalRecovery', payload.recoveryAmount);
    formData.append('penyebabKejadian', payload.caseCause);
    formData.append('kronologiSingkat', payload.brief);
    formData.append(
      'tanggalIdentifikasi',
      payload.identifiedDate ? payload.identifiedDate : new Date(),
    );
    formData.append('nominalRealisasiKerugian', payload.actualLoss);
    payload.actionPlan.forEach((action, index) => {
      Object.entries(action).forEach(([actionKey, actionValue]) => {
        if (actionKey === 'file' && actionValue !== '' && typeof actionValue === 'object') {
          formData.append(`actionPlans[${index}].multipartFile`, actionValue);
        } else if (actionKey === 'email') {
          formData.append(`actionPlans[${index}].email`, actionValue);
        } else if (actionKey === 'plan') {
          formData.append(`actionPlans[${index}].actionPlan`, actionValue);
        } else if (actionKey === 'targetDate') {
          formData.append(`actionPlans[${index}].targetPenyelesaian`, actionValue);
        } else if (actionKey === 'workUnit') {
          formData.append(`actionPlans[${index}].unitKerja`, actionValue.id);
        } else if (actionKey === 'branch') {
          formData.append(`actionPlans[${index}].cabang`, actionValue.id);
        } else if (actionKey === 'PIC') {
          formData.append(`actionPlans[${index}].penanggungJawab`, actionValue);
        } else if (actionKey === 'id') {
          formData.append(`actionPlans[${index}].idActionPlan`, actionValue);
        } else {
        }
      });
    });

    try {
      const res = await fetch(API_URL + `save-draft?` + queryString, {
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

export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';

export const fetchListStart = () => ({
  type: FETCH_LIST_REQUEST,
});

export const fetchListSuccess = (data) => ({
  type: FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchListFailure = (error) => ({
  type: FETCH_LIST_FAILURE,
  payload: error,
});

export const getAllList = (pagination, keyword, user) => {
  const queryString = stringify(
    {
      role: user.role,
      pageSize: pagination?.perPage,
      idLaporan: keyword,
      pageNumber: pagination?.page,
      kodeCabang: user.branchCode,
      kodeUnitKerja: user.division,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchListStart());

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
        dispatch(fetchListSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchListFailure(err));
    }
  };
};

export const approveLED = (id, user) => {
  const queryString = stringify(
    {},
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchListStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    const requestBody = {
      id,
      nip: user.nip,
      nama: user.name,
      role: user.role,
    };

    try {
      const res = await fetch(API_URL + `approve-form-led?` + queryString, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchListSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchListFailure(err));
    }
  };
};

export const sendBackLED = (id, user, comment) => {
  const queryString = stringify(
    {},
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchListStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    const requestBody = {
      id: id,
      nip: user.nip,
      nama: user.name,
      role: user.role,
      keterangan: comment,
    };

    try {
      const res = await fetch(API_URL + `sendback-form-led?` + queryString, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchListSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchListFailure(err));
    }
  };
};

export const approveIRM = (id, user) => {
  const queryString = stringify(
    {},
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchListStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    const requestBody = {
      id,
      nip: user.nip,
      nama: user.name,
      role: user.role,
    };

    try {
      const res = await fetch(API_URL + `closed-form-led?` + queryString, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchListSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchListFailure(err));
    }
  };
};

export const rejectIRM = (id, user, comment) => {
  const queryString = stringify(
    {},
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchListStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    const requestBody = {
      id: id,
      nip: user.nip,
      nama: user.name,
      keterangan: comment,
      // role: user.role,
    };

    try {
      const res = await fetch(API_URL + `void-form-led?` + queryString, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchListSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchListFailure(err));
    }
  };
};

export const FETCH_INBOX_REQUEST = 'FETCH_INBOX_REQUEST';
export const FETCH_INBOX_SUCCESS = 'FETCH_INBOX_SUCCESS';
export const FETCH_INBOX_FAILURE = 'FETCH_INBOX_FAILURE';

export const fetchInboxStart = () => ({
  type: FETCH_INBOX_REQUEST,
});

export const fetchInboxSuccess = (data) => ({
  type: FETCH_INBOX_SUCCESS,
  payload: data,
});

export const fetchInboxFailure = (error) => ({
  type: FETCH_INBOX_FAILURE,
  payload: error,
});

export const getAllInbox = (pagination, keyword, user) => {
  const queryString = stringify(
    {
      role: user.role,
      pageSize: pagination?.perPage,
      idLaporan: keyword,
      pageNumber: pagination?.page,
      kodeCabang: user.branchCode,
      kodeUnitKerja: user.division,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );
  return async (dispatch) => {
    dispatch(fetchInboxStart());

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
        dispatch(fetchInboxSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchInboxFailure(err));
    }
  };
};

export const FETCH_ONE_FORM_LED_REQUEST = 'FETCH_ONE_FORM_LED_REQUEST';
export const FETCH_ONE_FORM_LED_SUCCESS = 'FETCH_ONE_FORM_LED_SUCCESS';
export const FETCH_ONE_FORM_LED_FAILURE = 'FETCH_ONE_FORM_LED_FAILURE';

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

export const getOneFormLed = (id, incidentNumber) => {
  const queryString = stringify(
    {
      id,
      nomorInsiden: incidentNumber,
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

export const FETCH_HISTORY_LED_REQUEST = 'FETCH_HISTORY_LED_REQUEST';
export const FETCH_HISTORY_LED_SUCCESS = 'FETCH_HISTORY_LED_SUCCESS';
export const FETCH_HISTORY_LED_FAILURE = 'FETCH_HISTORY_LED_FAILURE';

export const fetchHistoryLedStart = () => ({
  type: FETCH_HISTORY_LED_REQUEST,
});

export const fetchHistoryLedSuccess = (data) => ({
  type: FETCH_HISTORY_LED_SUCCESS,
  payload: data,
});

export const fetchHistoryLedFailure = (error) => ({
  type: FETCH_HISTORY_LED_FAILURE,
  payload: error,
});

export const getHistoryLED = (id) => {
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
    dispatch(fetchHistoryLedStart());

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
        dispatch(fetchHistoryLedSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchHistoryLedFailure(err));
    }
  };
};

export const FETCH_ZERO_REPORT_REQUEST = 'FETCH_ZERO_REPORT_REQUEST';
export const FETCH_ZERO_REPORT_SUCCESS = 'FETCH_ZERO_REPORT_SUCCESS';
export const FETCH_ZERO_REPORT_FAILURE = 'FETCH_ZERO_REPORT_FAILURE';

export const fetchZeroReportStart = () => ({
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

export const getZeroReport = (pagination, keyword, user) => {
  const queryString = stringify(
    {
      pageSize: pagination?.perPage,
      pageNumber: pagination?.page,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchZeroReportStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-laporan-nihil?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();

      if (res.status === 200) {
        dispatch(fetchZeroReportSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchZeroReportFailure(err));
    }
  };
};

export const createZeroReport = (user) => {
  const queryString = stringify(
    {},
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  const requestBody = {
    kodeCabang: Number(user.branch),
    kodeUnitKerja: user.workUnit,
  };

  return async (dispatch) => {
    dispatch(fetchZeroReportStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `save-laporan-nihil?` + queryString, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();

      if (res.status === 200) {
        dispatch(fetchZeroReportSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchZeroReportFailure(err));
    }
  };
};

export const updateWorkingDays = (days) => {
  const queryString = stringify(
    {},
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  const requestBody = {
    workingDays: days,
  };

  return async (dispatch) => {
    dispatch(fetchZeroReportStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `update-working-days?` + queryString, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();

      if (res.status === 200) {
        dispatch(fetchZeroReportSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchZeroReportFailure(err));
    }
  };
};
