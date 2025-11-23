/* Metrics reducer */

const initialState = {
  summary: null,
  isLoading: false
};

const SET_METRICS_LOADING = 'SET_METRICS_LOADING';
const FETCH_METRICS_SUCCESS = 'FETCH_METRICS_SUCCESS';

export default function metricsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_METRICS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case FETCH_METRICS_SUCCESS:
      return {
        ...state,
        summary: action.payload
      };
    default:
      return state;
  }
}

export { SET_METRICS_LOADING, FETCH_METRICS_SUCCESS };
