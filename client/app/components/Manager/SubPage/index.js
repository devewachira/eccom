/**
 *
 * SubPage
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../Common/Button';

const SubPage = props => {
  const { title, action, actionTitle, handleAction, children } = props;

  const renderAction = () => {
    // New API: action={{ to, text }}
    if (action && action.to && action.text) {
      return (
        <Link to={action.to} className='btn btn-primary'>
          {action.text}
        </Link>
      );
    }

    // Backwards compatibility: actionTitle + handleAction
    if (actionTitle && typeof handleAction === 'function') {
      return <Button text={actionTitle} onClick={handleAction} />;
    }

    return null;
  };

  return (
    <div className='sub-page'>
      <div className='subpage-header'>
        <h3 className='mb-0'>{title}</h3>
        <div className='action'>{renderAction()}</div>
      </div>
      <div className='subpage-body'>{children}</div>
    </div>
  );
};

export default SubPage;
