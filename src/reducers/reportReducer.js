import {
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_FAILURE,
  FETCH_REPORT_SUCCESS,
  FETCH_ALL_REPORT_FAILURE,
  FETCH_ALL_REPORT_REQUEST,
  FETCH_ALL_REPORT_SUCCESS,
  FETCH_ZERO_REPORT_REQUEST,
  FETCH_ZERO_REPORT_FAILURE,
  FETCH_ZERO_REPORT_SUCCESS,
  FETCH_IRM_HISTORY_FAILURE,
  FETCH_IRM_HISTORY_REQUEST,
  FETCH_IRM_HISTORY_SUCCESS,
  FETCH_ACTUAL_LOSS_REPORT_FAILURE,
  FETCH_ACTUAL_LOSS_REPORT_REQUEST,
  FETCH_ACTUAL_LOSS_REPORT_SUCCESS,
  FETCH_POTENTIAL_LOSS_REPORT_FAILURE,
  FETCH_POTENTIAL_LOSS_REPORT_REQUEST,
  FETCH_POTENTIAL_LOSS_REPORT_SUCCESS,
} from '../actions/reportActions';

const initialState = {
  error: null,
  report: [],
  database: [],
  loading: false,
  zeroReport: {},
  irmHistory: [],
  actualLoss: [],
  potentialLoss: [],
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORT_REQUEST:
    case FETCH_ALL_REPORT_REQUEST:
    case FETCH_IRM_HISTORY_REQUEST:
    case FETCH_ZERO_REPORT_REQUEST:
    case FETCH_ACTUAL_LOSS_REPORT_REQUEST:
    case FETCH_POTENTIAL_LOSS_REPORT_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_REPORT_FAILURE:
    case FETCH_ALL_REPORT_FAILURE:
    case FETCH_IRM_HISTORY_FAILURE:
    case FETCH_ZERO_REPORT_FAILURE:
    case FETCH_ACTUAL_LOSS_REPORT_FAILURE:
    case FETCH_POTENTIAL_LOSS_REPORT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_REPORT_SUCCESS:
      return { ...state, report: action.payload, loading: false };
    case FETCH_ALL_REPORT_SUCCESS:
      return { ...state, database: action.payload, loading: false };
    case FETCH_ZERO_REPORT_SUCCESS:
      return { ...state, zeroReport: action.payload, loading: false };
    case FETCH_IRM_HISTORY_SUCCESS:
      return { ...state, irmHistory: action.payload, loading: false };
    case FETCH_ACTUAL_LOSS_REPORT_SUCCESS:
      return { ...state, actualLoss: action.payload, loading: false };
    case FETCH_POTENTIAL_LOSS_REPORT_SUCCESS:
      return { ...state, potentialLoss: action.payload, loading: false };

    default:
      return state;
  }
};

export default reportReducer;
