import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import cx from 'classnames';

import Icon from './Icon';

export default class Notification extends Component {
  static propTypes = {
    body: PropTypes.string.isRequired,
    className: PropTypes.string,
    icon: PropTypes.string,
    onDismiss: PropTypes.func,
    type: PropTypes.oneOf(['danger', 'default', 'success']),
  };

  static defaultProps = {
    className: '',
    icon: '',
    onDismiss: () => {},
    type: 'default',
  };

  render() {
    const { body, className, icon, onDismiss, type } = this.props;
    const classes = cx('notification', className, {
      'notification--danger': type === 'danger',
      'notification--default': type === 'default',
      'notification--success': type === 'success',
    });

    const renderIcon = () => {
      if (icon) {
        return (<Icon icon={icon} className="notification__icon" />);
      }

      return false;
    };

    return (
      <div className={classes}>
        {renderIcon()}
        <div className="notification__text">
          {body}
        </div>
        <button type="button" className="toast__close" onClick={onDismiss} ><Icon icon="close" /></button>
      </div>
    );
  }
}
