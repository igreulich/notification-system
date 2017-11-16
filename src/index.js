import React from 'react';
import ReactDOM from 'react-dom';

import * as NotificationActions from './actions';

import NotificationsContainer from './containers/NotificationsContainer';

import './less/notification-system.less';

document.addEventListener('DOMContentLoaded', () => {
  const notificationsContainer = document.getElementById('js-notifications-container');

  if (notificationsContainer) {
    ReactDOM.render(<NotificationsContainer />, notificationsContainer);
  }
}, false);

export default NotificationActions;
