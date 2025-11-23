/** Metrics actions */

import axios from 'axios';

import { API_URL } from '../../constants';
import handleError from '../../utils/error';
import { SET_METRICS_LOADING, FETCH_METRICS_SUCCESS } from './reducer';

export const setMetricsLoading = value => ({
  type: SET_METRICS_LOADING,
  payload: value
});

export const fetchMetrics = () => {
  return async dispatch => {
    dispatch(setMetricsLoading(true));

    try {
      const response = await axios.get(`${API_URL}/metrics/summary`);
      dispatch({ type: FETCH_METRICS_SUCCESS, payload: response.data });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setMetricsLoading(false));
    }
  };
};
