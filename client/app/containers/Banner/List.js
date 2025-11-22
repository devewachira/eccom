/**
 *
 * BannerList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';
import { API_URL } from '../../constants';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class BannerList extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBanners();
  }

  render() {
    const { banners, deleteBanner } = this.props;

    return (
      <div className='banner-list'>
        <SubPage
          title={'Banners'}
          action={{ to: '/dashboard/banner/add', text: 'Add Banner' }}
        />
        {banners && banners.length > 0 ? (
          banners.map((banner, index) => (
            <div key={index} className='mb-3 mb-md-0'>
              <div className='product-container'>
                <div className='item-box'>
                  <div className='item-link'>
                    <div className='item-image-container'>
                      <div className='item-image-box'>
                        <img
                          className='item-image'
                          src={`${
                            banner.imageUrl
                              ? `${API_URL.replace('/api', '')}${
                                  banner.imageUrl
                                }`
                              : '/images/placeholder-image.png'
                          }`}
                        />
                      </div>
                    </div>
                    <div className='item-body'>
                      <div className='item-details p-3'>
                        <h1 className='item-name'>{banner.title}</h1>
                        <p className='item-desc mb-0'>{banner.content}</p>
                      </div>
                    </div>
                    <div className='d-flex flex-row justify-content-between align-items-center px-4 mb-2 item-footer'>
                      <Link
                        to={`/dashboard/banner/edit/${banner._id}`}
                        className='btn btn-primary'
                      >
                        Edit
                      </Link>
                      <button
                        className='btn btn-danger'
                        onClick={() => deleteBanner(banner._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NotFound message='No banners found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    banners: state.banner.banners
  };
};

export default connect(mapStateToProps, actions)(BannerList);

