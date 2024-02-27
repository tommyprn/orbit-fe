import {
  FETCH_FORM_LED_REQUEST,
  FETCH_FORM_LED_SUCCESS,
  FETCH_FORM_LED_FAILURE,
  FETCH_ONE_FORM_LED_FAILURE,
  FETCH_ONE_FORM_LED_REQUEST,
  FETCH_ONE_FORM_LED_SUCCESS,
} from '../actions/formLEDActions';

const initialState = {
  LED: [],
  detail: {},
  loading: false,
  error: null,
};

const formLedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORM_LED_REQUEST:
    case FETCH_ONE_FORM_LED_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_FORM_LED_FAILURE:
    case FETCH_ONE_FORM_LED_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_FORM_LED_SUCCESS:
      return { ...state, LED: action.payload, loading: false };
    case FETCH_ONE_FORM_LED_SUCCESS:
      return { ...state, detail: action.payload, loading: false };

    default:
      return state;
  }
};

export default formLedReducer;
