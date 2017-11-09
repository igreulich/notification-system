import React from 'react';
import ReactDOM from 'react-dom';

import * as NotificationActions from './actions';

import NotificationsContainer from './containers/NotificationsContainer';

document.addEventListener('DOMContentLoaded', () => {
  const notificationsContainer = document.getElementById('js-notifications-container');

  if (notificationsContainer) {
    ReactDOM.render(<NotificationsContainer />, notificationsContainer);
  }
}, false);

export { NotificationActions }; // eslint-disable-line import/prefer-default-export
