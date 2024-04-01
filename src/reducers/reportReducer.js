import {
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_FAILURE,
  FETCH_REPORT_SUCCESS,
} from '../actions/reportActions';

const initialState = {
  error: null,
  report: [],
  loading: false,
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_REPORT_SUCCESS:
      return { ...state, report: action.payload, loading: false };
    case FETCH_REPORT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reportReducer;
