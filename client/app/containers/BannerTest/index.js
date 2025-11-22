/**
 *
 * BannerTest
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';
import { API_URL } from '../../constants';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class BannerTest extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBanners();
  }

  render() {
    const { banners, isLoading } = this.props;

    console.log('banners in render:', banners);

    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (!banners || banners.length === 0) {
      return <div>No banners found.</div>;
    }

    return (
      <div>
        <h1>Banner Test</h1>
        {banners.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <img
              src={`${API_URL.replace('/api', '')}${item.imageUrl}`}
              alt={item.title}
              style={{ width: '200px' }}
            />
            <p>{item.content}</p>
            <p>Position: {item.position}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    banners: state.banner.banners,
    isLoading: state.banner.isLoading
  };
};

export default connect(mapStateToProps, actions)(BannerTest);
