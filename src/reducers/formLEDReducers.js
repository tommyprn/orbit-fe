import {
  FETCH_LIST_FAILURE,
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_INBOX_FAILURE,
  FETCH_INBOX_REQUEST,
  FETCH_INBOX_SUCCESS,
  FETCH_FORM_LED_REQUEST,
  FETCH_FORM_LED_SUCCESS,
  FETCH_FORM_LED_FAILURE,
  FETCH_ONE_FORM_LED_FAILURE,
  FETCH_ONE_FORM_LED_REQUEST,
  FETCH_ONE_FORM_LED_SUCCESS,
} from '../actions/formLEDActions';

const initialState = {
  LED: [],
  list: {},
  inbox: {},
  detail: {},
  loading: false,
  error: null,
};

const formLedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
    case FETCH_INBOX_REQUEST:
    case FETCH_FORM_LED_REQUEST:
    case FETCH_ONE_FORM_LED_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_LIST_FAILURE:
    case FETCH_INBOX_FAILURE:
    case FETCH_FORM_LED_FAILURE:
    case FETCH_ONE_FORM_LED_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_LIST_SUCCESS:
      return { ...state, list: action.payload, loading: false };
    case FETCH_INBOX_SUCCESS:
      return { ...state, inbox: action.payload, loading: false };
    case FETCH_FORM_LED_SUCCESS:
      return { ...state, list: action.payload, loading: false };
    case FETCH_ONE_FORM_LED_SUCCESS:
      return { ...state, detail: action.payload, loading: false };

    default:
      return state;
  }
};

export default formLedReducer;
