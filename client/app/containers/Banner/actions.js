import axios from 'axios';
import { success } from 'react-notification-system-redux';

import {
  FETCH_BANNERS,
  FETCH_BANNER,
  ADD_BANNER,
  REMOVE_BANNER,
  BANNER_CHANGE,
  SET_BANNER_FORM_ERRORS,
  RESET_BANNER,
  SET_BANNERS_LOADING
} from './constants';

import { API_URL } from '../../constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';

export const bannerChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: BANNER_CHANGE,
    payload: formData
  };
};

// fetch banners api
export const fetchBanners = () => {
  return async dispatch => {
    try {
      dispatch({ type: SET_BANNERS_LOADING, payload: true });
      const response = await axios.get(`${API_URL}/banner`);
      dispatch({
        type: FETCH_BANNERS,
        payload: response.data.banners
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_BANNERS_LOADING, payload: false });
    }
  };
};

// fetch banner api
export const fetchBanner = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URL}/banner/${id}`);
      dispatch({
        type: FETCH_BANNER,
        payload: response.data.banner
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add banner api
export const addBanner = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        title: 'required',
        content: 'required',
        image: 'required'
      };

      const banner = getState().banner.bannerFormData;

      const { isValid, errors } = allFieldsValidation(banner, rules, {
        'required.title': 'Title is required.',
        'required.content': 'Content is required.',
        'required.image': 'Image is required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_BANNER_FORM_ERRORS, payload: errors });
      }

      const formData = new FormData();
      for (const key in banner) {
        formData.set(key, banner[key]);
      }

      const response = await axios.post(`${API_URL}/banner/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_BANNER,
          payload: response.data.banner
        });
        dispatch(resetBanner());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update banner api
export const updateBanner = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        title: 'required',
        content: 'required'
      };

      const banner = getState().banner.banner;

      const { isValid, errors } = allFieldsValidation(banner, rules, {
        'required.title': 'Title is required.',
        'required.content': 'Content is required.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_BANNER_FORM_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`${API_URL}/banner/${banner._id}`, {
        banner
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch(resetBanner());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete banner api
export const deleteBanner = id => {
  return async dispatch => {
    try {
      const response = await axios.delete(`${API_URL}/banner/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_BANNER,
          payload: id
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const resetBanner = () => {
  return {
    type: RESET_BANNER
  };
};
