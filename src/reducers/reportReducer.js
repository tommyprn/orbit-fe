import {
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_FAILURE,
  FETCH_REPORT_SUCCESS,
  FETCH_ZERO_REPORT_REQUEST,
  FETCH_ZERO_REPORT_FAILURE,
  FETCH_ZERO_REPORT_SUCCESS,
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
  loading: false,
  zeroReport: {},
  actualLossReport: [],
  potentialLossReport: [],
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORT_REQUEST:
    case FETCH_ZERO_REPORT_REQUEST:
    case FETCH_ACTUAL_LOSS_REPORT_REQUEST:
    case FETCH_POTENTIAL_LOSS_REPORT_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_REPORT_FAILURE:
    case FETCH_ZERO_REPORT_FAILURE:
    case FETCH_ACTUAL_LOSS_REPORT_FAILURE:
    case FETCH_POTENTIAL_LOSS_REPORT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_REPORT_SUCCESS:
      return { ...state, report: action.payload, loading: false };
    case FETCH_ZERO_REPORT_SUCCESS:
      return { ...state, zeroReport: action.payload, loading: false };
    case FETCH_ACTUAL_LOSS_REPORT_SUCCESS:
      return { ...state, actualLossReport: action.payload, loading: false };
    case FETCH_POTENTIAL_LOSS_REPORT_SUCCESS:
      return { ...state, potentialLossReport: action.payload, loading: false };

    default:
      return state;
  }
};

export default reportReducer;
