import { stringify } from 'qs';

const API_URL = 'http://10.80.240.45:1933/api/v1/';
// const API_URL = 'http://10.55.54.161:30090/api/v1/';

//============================== CASE STATUS =================================
export const FETCH_DROPDOWN_REQUEST = 'FETCH_DROPDOWN_REQUEST';
export const FETCH_DROPDOWN_SUCCESS = 'FETCH_DROPDOWN_SUCCESS';
export const FETCH_DROPDOWN_FAILURE = 'FETCH_DROPDOWN_FAILURE';

export const fetchDropdownStart = () => ({
  type: FETCH_DROPDOWN_REQUEST,
});

export const fetchDropdownSuccess = (data) => ({
  type: FETCH_DROPDOWN_SUCCESS,
  payload: data,
});

export const fetchDropdownFailure = (error) => ({
  type: FETCH_DROPDOWN_FAILURE,
  payload: error,
});

export const getDropdown = (id) => {
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
    dispatch(fetchDropdownStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-dropdown?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchDropdownSuccess(responseJSON.data));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchDropdownFailure(err));
    }
  };
};

//============================== CASE STATUS =================================

export const FETCH_CASE_STATUS_REQUEST = 'FETCH_CASE_STATUS_REQUEST';
export const FETCH_CASE_STATUS_SUCCESS = 'FETCH_CASE_STATUS_SUCCESS';
export const FETCH_CASE_STATUS_FAILURE = 'FETCH_CASE_STATUS_FAILURE';

export const fetchCaseStatusStart = () => ({
  type: FETCH_CASE_STATUS_REQUEST,
});

export const fetchCaseStatusSuccess = (data) => ({
  type: FETCH_CASE_STATUS_SUCCESS,
  payload: data,
});

export const fetchCaseStatusFailure = (error) => ({
  type: FETCH_CASE_STATUS_FAILURE,
  payload: error,
});

export const getCaseStatus = (pagination, keyword) => {
  const queryString = stringify(
    {
      keyword: keyword,
      pageSize: pagination?.perPage,
      pageNumber: pagination?.page,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchCaseStatusStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-status-kejadian?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCaseStatusSuccess(responseJSON));
      }

      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCaseStatusFailure(err));
    }
  };
};

export const updateCaseStatus = (payload) => {
  return async (dispatch) => {
    dispatch(fetchCaseStatusStart());

    const requestBody = {
      id: payload.id,
      nama: payload.name,
      isEnable: payload.isEnable,
      deskripsi: payload.description,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'update-status-kejadian', {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCaseStatusSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCaseStatusFailure(err));
    }
  };
};

export const deleteCaseStatus = (id) => {
  return async (dispatch) => {
    dispatch(fetchCaseStatusStart());

    const requestBody = {};

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `delete-status-kejadian?id=${id}`, {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCaseStatusSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCaseStatusFailure(err));
    }
  };
};

export const createCaseStatus = (payload) => {
  return async (dispatch) => {
    dispatch(fetchCaseStatusStart());

    const requestBody = {
      nama: payload.name,
      deskripsi: payload.description,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'save-status-kejadian', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCaseStatusSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCaseStatusFailure(err));
    }
  };
};

//============================== CASE CAUSE =================================

export const FETCH_CASE_CAUSE_REQUEST = 'FETCH_CASE_CAUSE_REQUEST';
export const FETCH_CASE_CAUSE_SUCCESS = 'FETCH_CASE_CAUSE_SUCCESS';
export const FETCH_CASE_CAUSE_FAILURE = 'FETCH_CASE_CAUSE_FAILURE';

export const fetchCaseCauseStart = () => ({
  type: FETCH_CASE_CAUSE_REQUEST,
});

export const fetchCaseCauseSuccess = (data) => ({
  type: FETCH_CASE_CAUSE_SUCCESS,
  payload: data,
});

export const fetchCaseCauseFailure = (error) => ({
  type: FETCH_CASE_CAUSE_FAILURE,
  payload: error,
});

export const getCaseCause = (pagination, keyword) => {
  const queryString = stringify(
    {
      keyword: keyword,
      pageSize: pagination?.perPage,
      pageNumber: pagination?.page,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchCaseCauseStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-penyebab-kejadian?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCaseCauseSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCaseCauseFailure(err));
    }
  };
};

export const updateCaseCause = (payload) => {
  return async (dispatch) => {
    dispatch(fetchCaseCauseStart());

    const requestBody = {
      id: payload.id,
      nama: payload.name,
      isEnable: payload.isEnable,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'update-penyebab-kejadian', {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCaseCauseSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCaseCauseFailure(err));
    }
  };
};

export const deleteCaseCause = (id) => {
  return async (dispatch) => {
    dispatch(fetchCaseCauseStart());

    const requestBody = {};

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `delete-penyebab-kejadian?id=${id}`, {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCaseCauseSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCaseCauseFailure(err));
    }
  };
};

export const createCaseCause = (payload) => {
  return async (dispatch) => {
    dispatch(fetchCaseCauseStart());

    const requestBody = {
      nama: payload.name,
      deskripsi: payload.description,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'save-penyebab-kejadian', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCaseCauseSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCaseCauseFailure(err));
    }
  };
};

//============================== CASE CATEGORY =================================

export const FETCH_LEVEL_ONE_REQUEST = 'FETCH_LEVEL_ONE_REQUEST';
export const FETCH_LEVEL_ONE_SUCCESS = 'FETCH_LEVEL_ONE_SUCCESS';
export const FETCH_LEVEL_ONE_FAILURE = 'FETCH_LEVEL_ONE_FAILURE';

export const fetchLevelOneStart = () => ({
  type: FETCH_LEVEL_ONE_REQUEST,
});

export const fetchLevelOneSuccess = (data) => ({
  type: FETCH_LEVEL_ONE_SUCCESS,
  payload: data,
});

export const fetchLevelOneFailure = (error) => ({
  type: FETCH_LEVEL_ONE_FAILURE,
  payload: error,
});

export const getLevelOne = (pagination, keyword) => {
  const queryString = stringify(
    {
      keyword: keyword,
      pageSize: pagination?.perPage,
      pageNumber: pagination?.page,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchLevelOneStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-kategori-kejadian?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelOneSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelOneFailure(err));
    }
  };
};

export const updateLevelOne = (payload) => {
  return async (dispatch) => {
    dispatch(fetchLevelOneStart());

    const requestBody = {
      id: payload.id,
      nama: payload.name,
      isEnable: payload.isEnable,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'update-kategori-kejadian', {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelOneSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelOneFailure(err));
    }
  };
};

export const deleteLevelOne = (id) => {
  return async (dispatch) => {
    dispatch(fetchLevelOneStart());

    const requestBody = {};

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `delete-kategori-kejadian?id=${id}`, {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelOneSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelOneFailure(err));
    }
  };
};

export const createLevelOne = (payload) => {
  return async (dispatch) => {
    dispatch(fetchLevelOneStart());

    const requestBody = {
      nama: payload.name,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'save-kategori-kejadian', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelOneSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelOneFailure(err));
    }
  };
};

export const FETCH_LEVEL_TWO_REQUEST = 'FETCH_LEVEL_TWO_REQUEST';
export const FETCH_LEVEL_TWO_SUCCESS = 'FETCH_LEVEL_TWO_SUCCESS';
export const FETCH_LEVEL_TWO_FAILURE = 'FETCH_LEVEL_TWO_FAILURE';

export const fetchLevelTwoStart = () => ({
  type: FETCH_LEVEL_TWO_REQUEST,
});

export const fetchLevelTwoSuccess = (data) => ({
  type: FETCH_LEVEL_TWO_SUCCESS,
  payload: data,
});

export const fetchLevelTwoFailure = (error) => ({
  type: FETCH_LEVEL_TWO_FAILURE,
  payload: error,
});

export const getLevelTwo = (pagination, keyword) => {
  const queryString = stringify(
    {
      keyword: keyword,
      pageSize: pagination?.perPage,
      pageNumber: pagination?.page,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchLevelTwoStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-subkategori?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelTwoSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelTwoFailure(err));
    }
  };
};

export const updateLevelTwo = (payload) => {
  return async (dispatch) => {
    dispatch(fetchLevelTwoStart());

    const requestBody = {
      id: payload.id, //id subkategori
      nama: payload.name, //nama subkategori
      idKategoriKejadian: payload.parentId, //id basel 1
      isEnable: payload.isEnable,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'update-subkategori', {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelTwoSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelTwoFailure(err));
    }
  };
};

export const deleteLevelTwo = (id) => {
  return async (dispatch) => {
    dispatch(fetchLevelTwoStart());

    const requestBody = {};

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `delete-subkategori?id=${id}`, {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelTwoSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelTwoFailure(err));
    }
  };
};

export const createLevelTwo = (payload) => {
  return async (dispatch) => {
    dispatch(fetchLevelTwoStart());

    const requestBody = {
      nama: payload.name, //nama subkategori
      idKategoriKejadian: payload.parentId, //id basel 1
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'save-subkategori', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelTwoSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelTwoFailure(err));
    }
  };
};

export const FETCH_LEVEL_THREE_REQUEST = 'FETCH_LEVEL_THREE_REQUEST';
export const FETCH_LEVEL_THREE_SUCCESS = 'FETCH_LEVEL_THREE_SUCCESS';
export const FETCH_LEVEL_THREE_FAILURE = 'FETCH_LEVEL_THREE_FAILURE';

export const fetchLevelThreeStart = () => ({
  type: FETCH_LEVEL_THREE_REQUEST,
});

export const fetchLevelThreeSuccess = (data) => ({
  type: FETCH_LEVEL_THREE_SUCCESS,
  payload: data,
});

export const fetchLevelThreeFailure = (error) => ({
  type: FETCH_LEVEL_THREE_FAILURE,
  payload: error,
});

export const getLevelThree = (pagination, keyword) => {
  const queryString = stringify(
    {
      keyword: keyword,
      pageSize: pagination?.perPage,
      pageNumber: pagination?.page,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchLevelThreeStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-aktivitas?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelThreeSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelThreeFailure(err));
    }
  };
};

export const updateLevelThree = (payload) => {
  return async (dispatch) => {
    dispatch(fetchLevelThreeStart());

    const requestBody = {
      id: payload.id,
      nama: payload.name,
      isEnable: payload.isEnable,
      idSubKategori: payload.parentId,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'update-aktivitas', {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelThreeSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelThreeFailure(err));
    }
  };
};

export const deleteLevelThree = (id) => {
  return async (dispatch) => {
    dispatch(fetchLevelThreeStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `delete-aktivitas?id=${id}`, {
        method: 'DELETE',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelThreeSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelThreeFailure(err));
    }
  };
};

export const createLevelThree = (payload) => {
  return async (dispatch) => {
    dispatch(fetchLevelThreeStart());

    const requestBody = {
      nama: payload.name,
      idSubKategori: payload.parentId,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'save-aktivitas', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchLevelThreeSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchLevelThreeFailure(err));
    }
  };
};

//============================== REPORT STATUS =================================

export const FETCH_REPORT_STATUS_REQUEST = 'FETCH_REPORT_STATUS_REQUEST';
export const FETCH_REPORT_STATUS_SUCCESS = 'FETCH_REPORT_STATUS_SUCCESS';
export const FETCH_REPORT_STATUS_FAILURE = 'FETCH_REPORT_STATUS_FAILURE';

export const fetchReportStatusStart = () => ({
  type: FETCH_REPORT_STATUS_REQUEST,
});

export const fetchReportStatusSuccess = (data) => ({
  type: FETCH_REPORT_STATUS_SUCCESS,
  payload: data,
});

export const fetchReportStatusFailure = (error) => ({
  type: FETCH_REPORT_STATUS_FAILURE,
  payload: error,
});

export const getReportStatus = (pagination, keyword) => {
  const queryString = stringify(
    {
      keyword: keyword,
      pageSize: pagination?.perPage,
      pageNumber: pagination?.page,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchReportStatusStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-status-laporan?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchReportStatusSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchReportStatusFailure(err));
    }
  };
};

export const updateReportStatus = (payload) => {
  return async (dispatch) => {
    dispatch(fetchReportStatusStart());

    const requestBody = {
      id: payload.id,
      nama: payload.name,
      isEnable: payload.isEnable,
      deskripsi: payload.description,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'update-status-laporan', {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchReportStatusSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchReportStatusFailure(err));
    }
  };
};

export const deleteReportStatus = (id) => {
  return async (dispatch) => {
    dispatch(fetchReportStatusStart());

    const requestBody = {};

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `delete-status-laporan?id=${id}`, {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchReportStatusSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchReportStatusFailure(err));
    }
  };
};

export const createReportStatus = (payload) => {
  return async (dispatch) => {
    dispatch(fetchReportStatusStart());

    const requestBody = {
      nama: payload.name,
      deskripsi: payload.description,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'save-status-laporan', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchReportStatusSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchReportStatusFailure(err));
    }
  };
};

//============================== COST CENTRE =================================

export const FETCH_COST_CENTRE_REQUEST = 'FETCH_COST_CENTRE_REQUEST';
export const FETCH_COST_CENTRE_SUCCESS = 'FETCH_COST_CENTRE_SUCCESS';
export const FETCH_COST_CENTRE_FAILURE = 'FETCH_COST_CENTRE_FAILURE';

export const fetchCostCentreStart = () => ({
  type: FETCH_COST_CENTRE_REQUEST,
});

export const fetchCostCentreSuccess = (data) => ({
  type: FETCH_COST_CENTRE_SUCCESS,
  payload: data,
});

export const fetchCostCentreFailure = (error) => ({
  type: FETCH_COST_CENTRE_FAILURE,
  payload: error,
});

export const getCostCentre = (pagination, keyword) => {
  const queryString = stringify(
    {
      keyword: keyword,
      pageSize: pagination?.perPage,
      pageNumber: pagination?.page,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchCostCentreStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-ssl?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCostCentreSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCostCentreFailure(err));
    }
  };
};

export const updateCostCentre = (payload) => {
  return async (dispatch) => {
    dispatch(fetchCostCentreStart());

    const requestBody = {
      id: payload.id,
      kode: payload.code,
      nama: payload.name,
      isEnable: payload.isEnable,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'update-ssl', {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCostCentreSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCostCentreFailure(err));
    }
  };
};

export const deleteCostCentre = (id) => {
  return async (dispatch) => {
    dispatch(fetchCostCentreStart());

    const requestBody = {};

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `delete-ssl?id=${id}`, {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCostCentreSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCostCentreFailure(err));
    }
  };
};

export const createCostCentre = (payload) => {
  return async (dispatch) => {
    dispatch(fetchCostCentreStart());

    const requestBody = {
      id: payload.id,
      kode: payload.code,
      nama: payload.name,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'save-ssl', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchCostCentreSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchCostCentreFailure(err));
    }
  };
};

//============================== WORK UNIT =================================

export const FETCH_WORK_UNIT_REQUEST = 'FETCH_WORK_UNIT_REQUEST';
export const FETCH_WORK_UNIT_SUCCESS = 'FETCH_WORK_UNIT_SUCCESS';
export const FETCH_WORK_UNIT_FAILURE = 'FETCH_WORK_UNIT_FAILURE';

export const fetchWorkUnitStart = () => ({
  type: FETCH_WORK_UNIT_REQUEST,
});

export const fetchWorkUnitSuccess = (data) => ({
  type: FETCH_WORK_UNIT_SUCCESS,
  payload: data,
});

export const fetchWorkUnitFailure = (error) => ({
  type: FETCH_WORK_UNIT_FAILURE,
  payload: error,
});

export const getWorkUnit = (pagination, keyword) => {
  const queryString = stringify(
    {
      pageSize: pagination?.perPage,
      pageNumber: pagination?.page,
      keyword: keyword,
    },
    {
      arrayFormat: 'comma',
      encode: false,
    },
  );

  return async (dispatch) => {
    dispatch(fetchWorkUnitStart());

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `get-all-unit-kerja?` + queryString, {
        method: 'GET',
        headers: requestHeaders,
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchWorkUnitSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchWorkUnitFailure(err));
    }
  };
};

export const updateWorkUnit = (payload) => {
  return async (dispatch) => {
    dispatch(fetchWorkUnitStart());
    const requestBody = {
      namaPic: payload.pic,
      emailPic: payload.email,
      isEnable: payload.isEnable,
      idUnitKerja: payload.id,
      kodeUnitKerja: payload.code,
      namaUnitKerja: payload.name,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'update-unit-kerja?', {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchWorkUnitSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchWorkUnitFailure(err));
    }
  };
};

export const deleteWorkUnit = (id) => {
  return async (dispatch) => {
    dispatch(fetchWorkUnitStart());

    const requestBody = {};

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + `delete-unit-kerja?id=${id}`, {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchWorkUnitSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchWorkUnitFailure(err));
    }
  };
};

export const createWorkUnit = (payload) => {
  return async (dispatch) => {
    dispatch(fetchWorkUnitStart());
    const requestBody = {
      namaPic: payload.pic,
      emailPic: payload.email,
      namaUnitKerja: payload.name,
      kodeUnitKerja: payload.code,
    };

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ac',
    };

    try {
      const res = await fetch(API_URL + 'save-unit-kerja?', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      const responseJSON = await res.json();
      if (res.status === 200) {
        dispatch(fetchWorkUnitSuccess(responseJSON));
      }
      return responseJSON;
    } catch (err) {
      console.log(err);
      dispatch(fetchWorkUnitFailure(err));
    }
  };
};
