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

const initialState = {
  banners: [],
  banner: {},
  bannerFormData: {
    title: '',
    link: '',
    content: '',
    isActive: true,
    image: null
  },
  formErrors: {},
  isLoading: false
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BANNERS:
      return {
        ...state,
        banners: action.payload
      };
    case FETCH_BANNER:
      return {
        ...state,
        banner: action.payload,
        bannerFormData: action.payload
      };
    case ADD_BANNER:
      return {
        ...state,
        banners: [...state.banners, action.payload]
      };
    case REMOVE_BANNER:
      return {
        ...state,
        banners: state.banners.filter(banner => banner._id !== action.payload)
      };
    case BANNER_CHANGE:
      return {
        ...state,
        bannerFormData: { ...state.bannerFormData, ...action.payload }
      };
    case SET_BANNER_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_BANNERS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case RESET_BANNER:
      return {
        ...state,
        banner: {},
        bannerFormData: {
          title: '',
          link: '',
          content: '',
          isActive: true,
          image: null
        },
        formErrors: {}
      };
    default:
      return state;
  }
};

export default bannerReducer;
