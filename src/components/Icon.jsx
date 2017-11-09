import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import cx from 'classnames';

export default class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { icon, className } = this.props;
    const classes = cx('fa', `fa-${icon}`, className);

    return (
      <i className={classes} />
    );
  }
}
