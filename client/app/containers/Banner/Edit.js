/**
 *
 * EditBanner
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import Input from '../../components/Common/Input';
import Switch from '../../components/Common/Switch';
import Button from '../../components/Common/Button';
import SelectOption from '../../components/Common/SelectOption';

const bannerPosition = [
  { value: 'main', label: 'Main' },
  { value: 'left-top', label: 'Left Top' },
  { value: 'left-bottom', label: 'Left Bottom' },
  { value: 'right-top', label: 'Right Top' },
  { value: 'right-bottom', label: 'Right Bottom' }
];

class EditBanner extends React.PureComponent {
  componentDidMount() {
    const bannerId = this.props.match.params.id;
    this.props.fetchBanner(bannerId);
  }

  componentWillUnmount() {
    this.props.resetBanner();
  }

  render() {
    const { banner, bannerChange, updateBanner, formErrors } = this.props;

    const handleSubmit = event => {
      event.preventDefault();
      updateBanner();
    };

    return (
      <div className='edit-banner'>
        <SubPage title={'Edit Banner'} isMenuOpen={null} />
        <div className='edit-banner-form'>
          <form onSubmit={handleSubmit} noValidate>
            <Input
              type={'text'}
              error={formErrors['title']}
              label={'Title'}
              name={'title'}
              placeholder={'Banner Title'}
              value={banner.title}
              onInputChange={(name, value) => {
                bannerChange(name, value);
              }}
            />
            <Input
              type={'textarea'}
              error={formErrors['content']}
              label={'Content'}
              name={'content'}
              placeholder={'Banner Content'}
              value={banner.content}
              onInputChange={(name, value) => {
                bannerChange(name, value);
              }}
            />
            <Input
              type={'text'}
              error={formErrors['link']}
              label={'Link'}
              name={'link'}
              placeholder={'Banner Link'}
              value={banner.link}
              onInputChange={(name, value) => {
                bannerChange(name, value);
              }}
            />
            <SelectOption
              error={formErrors['position']}
              label={'Position'}
              name={'position'}
              options={bannerPosition}
              value={
                banner.position
                  ? bannerPosition.find(item => item.value === banner.position)
                  : ''
              }
              handleSelectChange={value => {
                bannerChange('position', value.value);
              }}
            />
            <Switch
              id={'edit-banner-isActive'}
              name={'isActive'}
              label={'Active?'}
              checked={banner.isActive}
              toggleCheckboxChange={value => bannerChange('isActive', value)}
            />
            <hr />
            <div className='edit-banner-actions'>
              <Button type='submit' text='Update Banner' />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    banner: state.banner.banner,
    formErrors: state.banner.formErrors
  };
};

export default connect(mapStateToProps, actions)(EditBanner);
