import React from 'react';
import ReactDOM from 'react-dom';

import { NotificationActions } from '../';

const ExampleApp = () => {
  const handleClick = (event) => {
    event.preventDefault();

    NotificationActions.addNotification({
      body: 'This is an alert in a toast notification',
      icon: 'warning',
      type: 'danger',
      onDismiss() {
        console.log('I run when the notification was dismissed'); // eslint-disable-line no-console
      },
    });
  };

  return (
    <button type="button" onClick={handleClick}>Notification Test</button>
  );
};

ReactDOM.render(<ExampleApp />, document.getElementById('app'));
