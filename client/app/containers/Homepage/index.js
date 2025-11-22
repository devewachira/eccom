/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import { fetchBanners } from './actions';
import { filterProducts } from '../Product/actions';
import { updateWishlist } from '../WishList/actions';
import { handleAddToCart } from '../Cart/actions';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';
import ProductList from '../../components/Store/ProductList';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class Homepage extends React.PureComponent {
  componentDidMount() {
    // Load banners
    this.props.fetchBanners();
    // Load latest products for homepage (same filters as shop)
    this.props.filterProducts();
  }

  render() {
    const {
      banners,
      products,
      isLoading,
      authenticated,
      updateWishlist,
      handleAddToCart
    } = this.props;

    // Separate banners by position
    const mainBanners = banners.filter(
      banner => !banner.position || banner.position === 'main'
    );
    const leftTopBanner = banners.find(banner => banner.position === 'left-top');
    const leftBottomBanner = banners.find(
      banner => banner.position === 'left-bottom'
    );
    const rightTopBanner = banners.find(
      banner => banner.position === 'right-top'
    );
    const rightBottomBanner = banners.find(
      banner => banner.position === 'right-bottom'
    );

    return (
      <div className='homepage'>
        <Row className='flex-row'>
          <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={mainBanners.length > 1}
                autoPlaySpeed={3000}
                slides={mainBanners}
                responsive={responsiveOneItemCarousel}
              >
                {mainBanners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between side-banners'>
              <img
                src={
                  leftTopBanner && leftTopBanner.imageUrl
                    ? leftTopBanner.imageUrl
                    : '/images/banners/banner-2.jpg'
                }
                className='mb-3'
              />
              <img
                src={
                  leftBottomBanner && leftBottomBanner.imageUrl
                    ? leftBottomBanner.imageUrl
                    : '/images/banners/banner-5.jpg'
                }
              />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between side-banners'>
              <img
                src={
                  rightTopBanner && rightTopBanner.imageUrl
                    ? rightTopBanner.imageUrl
                    : '/images/banners/banner-2.jpg'
                }
                className='mb-3'
              />
              <img
                src={
                  rightBottomBanner && rightBottomBanner.imageUrl
                    ? rightBottomBanner.imageUrl
                    : '/images/banners/banner-6.jpg'
                }
              />
            </div>
          </Col>
        </Row>

        {/* New products section */}
        <Row className='mt-4'>
          <Col xs='12'>
            <h3 className='mb-3'>New Products</h3>
            {isLoading ? (
              <LoadingIndicator inline />
            ) : products && products.length > 0 ? (
              <ProductList
                products={products}
                authenticated={authenticated}
                updateWishlist={updateWishlist}
                handleAddToCart={handleAddToCart}
              />
            ) : (
              <NotFound message='No products found.' />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    banners: state.homepage.banners,
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated
  };
};

const mapDispatchToProps = {
  fetchBanners,
  filterProducts,
  updateWishlist,
  handleAddToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
