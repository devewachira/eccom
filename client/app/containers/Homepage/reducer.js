/*
 *
 * Homepage reducer
 *
 */

import { DEFAULT_ACTION } from './constants';
import { FETCH_BANNERS } from '../../constants';

const initialState = {
  banners: []
};

const homepageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return { ...state };
    case FETCH_BANNERS:
      return {
        ...state,
        banners: action.payload
      };
    default:
      return state;
  }
};

export default homepageReducer;
