import {
  FETCH_HISTORY_REQUEST,
  FETCH_HISTORY_FAILURE,
  FETCH_HISTORY_SUCCESS,
} from '../actions/userActions';

const initialState = {
  user: {},
  history: {},
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HISTORY_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_HISTORY_SUCCESS:
      return { ...state, history: action.payload, loading: false };
    case FETCH_HISTORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
