import {
  FETCH_BRANCH_FAILURE,
  FETCH_BRANCH_REQUEST,
  FETCH_BRANCH_SUCCESS,
  FETCH_DROPDOWN_FAILURE,
  FETCH_DROPDOWN_REQUEST,
  FETCH_DROPDOWN_SUCCESS,
  FETCH_WORK_UNIT_REQUEST,
  FETCH_WORK_UNIT_FAILURE,
  FETCH_WORK_UNIT_SUCCESS,
  FETCH_LEVEL_ONE_REQUEST,
  FETCH_LEVEL_ONE_FAILURE,
  FETCH_LEVEL_ONE_SUCCESS,
  FETCH_LEVEL_TWO_REQUEST,
  FETCH_LEVEL_TWO_FAILURE,
  FETCH_LEVEL_TWO_SUCCESS,
  FETCH_CASE_CAUSE_REQUEST,
  FETCH_CASE_CAUSE_FAILURE,
  FETCH_CASE_CAUSE_SUCCESS,
  FETCH_LEVEL_THREE_REQUEST,
  FETCH_LEVEL_THREE_FAILURE,
  FETCH_LEVEL_THREE_SUCCESS,
  FETCH_CASE_STATUS_REQUEST,
  FETCH_CASE_STATUS_FAILURE,
  FETCH_CASE_STATUS_SUCCESS,
  FETCH_COST_CENTRE_REQUEST,
  FETCH_COST_CENTRE_FAILURE,
  FETCH_COST_CENTRE_SUCCESS,
  FETCH_REPORT_STATUS_REQUEST,
  FETCH_REPORT_STATUS_FAILURE,
  FETCH_REPORT_STATUS_SUCCESS,
} from '../actions/masterDataActions.js';

const initialState = {
  error: null,
  branch: [],
  workUnit: [],
  caseCause: [],
  costCentre: [],
  caseStatus: [],
  caseCategory: { levelOne: [], levelTwo: [], levelThree: [] },
  reportStatus: [],
  dropdown: {
    workUnit: [],
    caseCause: [],
    costCentre: [],
    caseStatus: [],
    caseCategory: { levelOne: [], levelTwo: [], levelThree: [] },
    reportStatus: [],
  },
  isLoading: false,
};

const masterDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANCH_REQUEST:
    case FETCH_DROPDOWN_REQUEST:
    case FETCH_WORK_UNIT_REQUEST:
    case FETCH_LEVEL_ONE_REQUEST:
    case FETCH_LEVEL_TWO_REQUEST:
    case FETCH_CASE_CAUSE_REQUEST:
    case FETCH_LEVEL_THREE_REQUEST:
    case FETCH_CASE_STATUS_REQUEST:
    case FETCH_COST_CENTRE_REQUEST:
    case FETCH_REPORT_STATUS_REQUEST:
      return { ...state, isLoading: true };

    case FETCH_BRANCH_FAILURE:
    case FETCH_DROPDOWN_FAILURE:
    case FETCH_WORK_UNIT_FAILURE:
    case FETCH_LEVEL_ONE_FAILURE:
    case FETCH_LEVEL_TWO_FAILURE:
    case FETCH_CASE_CAUSE_FAILURE:
    case FETCH_LEVEL_THREE_FAILURE:
    case FETCH_CASE_STATUS_FAILURE:
    case FETCH_COST_CENTRE_FAILURE:
    case FETCH_REPORT_STATUS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case FETCH_BRANCH_SUCCESS:
      return { ...state, branch: action.payload, isLoading: false };
    case FETCH_WORK_UNIT_SUCCESS:
      return { ...state, workUnit: action.payload, isLoading: false };
    case FETCH_LEVEL_ONE_SUCCESS:
      return {
        ...state,
        caseCategory: { ...state.caseCategory, levelOne: action.payload },
        isLoading: false,
      };
    case FETCH_LEVEL_TWO_SUCCESS:
      return {
        ...state,
        caseCategory: { ...state.caseCategory, levelTwo: action.payload },
        isLoading: false,
      };
    case FETCH_CASE_CAUSE_SUCCESS:
      return { ...state, caseCause: action.payload, isLoading: false };
    case FETCH_CASE_STATUS_SUCCESS:
      return { ...state, caseStatus: action.payload, isLoading: false };
    case FETCH_COST_CENTRE_SUCCESS:
      return { ...state, costCentre: action.payload, isLoading: false };
    case FETCH_LEVEL_THREE_SUCCESS:
      return {
        ...state,
        caseCategory: { ...state.caseCategory, levelThree: action.payload },
        isLoading: false,
      };
    case FETCH_REPORT_STATUS_SUCCESS:
      return { ...state, reportStatus: action.payload, isLoading: false };
    case FETCH_DROPDOWN_SUCCESS:
      return {
        ...state,
        dropdown: {
          workUnit: action.payload.unitKerja,
          caseCause: action.payload.penyebabKejadian,
          costCentre: action.payload.ssl,
          caseStatus: action.payload.statusKejadian,
          caseCategory: {
            levelOne: action.payload.kategoriKejadian,
            levelTwo: action.payload.subKategori,
            levelThree: action.payload.aktivitas,
          },
          reportStatus: action.payload.statusLaporan,
          branch: action.payload.cabang,
        },
        isLoading: false,
      };

    default:
      return state;
  }
};

export default masterDataReducer;
