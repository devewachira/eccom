/*
 *
 * Homepage actions
 *
 */

import axios from 'axios';
import { success, error } from 'react-notification-system-redux';

import { API_URL } from '../../constants';
import { FETCH_BANNERS } from '../../constants';
import handleError from '../../utils/error';

import { DEFAULT_ACTION } from './constants';

export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION
  };
};

export const fetchBanners = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/banner`);

      const baseUrl = API_URL.replace('/api', '');
      const banners = response.data.banners.map(banner => ({
        ...banner,
        imageUrl: banner.imageUrl
          ? `${baseUrl}${banner.imageUrl}`
          : '/images/banners/banner-1.jpg'
      }));

      dispatch({
        type: FETCH_BANNERS,
        payload: banners
      });
    } catch (err) {
      handleError(err, dispatch);
    }
  };
};
