/**
 *
 * Banner
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import actions from '../../actions';

import Page404 from '../../components/Common/Page404';
import BannerList from './List';
import AddBanner from './Add';
import EditBanner from './Edit';

class Banner extends React.PureComponent {
  render() {
    const { match } = this.props;

    return (
      <div className='banner-dashboard'>
        <Switch>
          <Route exact path={`${match.path}`} component={BannerList} />
          <Route exact path={`${match.path}/add`} component={AddBanner} />
          <Route exact path={`${match.path}/edit/:id`} component={EditBanner} />
          <Route path='*' component={Page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(Banner);