import {
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILURE,
  CREATE_RECORD_REQUEST,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  reports: null,
  error: null,
  loading: false,
  created: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_REPORTS_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case FETCH_REPORTS_SUCCESS:
      return { ...state, ...INITIAL_STATE, reports: action.payload };
    case FETCH_REPORTS_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case CREATE_RECORD_REQUEST:
      return { ...state, loading: true };
    case CREATE_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        created: action.payload,
        error: false
      };
    case CREATE_RECORD_FAILURE:
      return {
        ...state,
        created: false,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
