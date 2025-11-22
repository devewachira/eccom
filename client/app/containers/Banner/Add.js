/**
 *
 * AddBanner
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

class AddBanner extends React.PureComponent {
  componentDidMount() {
    this.props.resetBanner();
  }

  render() {
    const { bannerFormData, formErrors, bannerChange, addBanner, image } = this.props;

    const handleSubmit = event => {
      event.preventDefault();
      addBanner();
    };

    return (
      <div className='add-banner'>
        <SubPage title={'Add Banner'} isMenuOpen={null} />
        <div className='add-banner-form'>
          <form onSubmit={handleSubmit} noValidate>
            <Input
              type={'text'}
              error={formErrors['title']}
              label={'Title'}
              name={'title'}
              placeholder={'Banner Title'}
              value={bannerFormData.title}
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
              value={bannerFormData.content}
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
              value={bannerFormData.link}
              onInputChange={(name, value) => {
                bannerChange(name, value);
              }}
            />
            <Input
              type={'file'}
              error={formErrors['image']}
              name={'image'}
              label={'Image'}
              placeholder={'Please Upload Image'}
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
                bannerFormData.position
                  ? bannerPosition.find(
                      item => item.value === bannerFormData.position
                    )
                  : ''
              }
              handleSelectChange={value => {
                bannerChange('position', value.value);
              }}
            />
            <Switch
              id={'add-banner-isActive'}
              name={'isActive'}
              label={'Active?'}
              checked={bannerFormData.isActive}
              toggleCheckboxChange={value => bannerChange('isActive', value)}
            />
            <hr />
            <div className='add-banner-actions'>
              <Button type='submit' text='Add Banner' />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bannerFormData: state.banner.bannerFormData,
    formErrors: state.banner.formErrors,
    image: state.banner.bannerFormData.image
  };
};

export default connect(mapStateToProps, actions)(AddBanner);
