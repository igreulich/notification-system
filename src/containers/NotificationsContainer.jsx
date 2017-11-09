import React, { Component } from 'react';

import NotificationStore from '../stores';
import * as NotificationActions from '../actions';

import NotificationContainer from './NotificationContainer';

const _state = NotificationStore.getState();

export default class NotificationsContainer extends Component {
  state = _state;

  componentDidMount() {
    NotificationStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    NotificationStore.unlisten(this.onChange.bind(this));
  }

  onChange = () => {
    this.setState(() => NotificationStore.getState());
  }

  onDismiss = (id) => {
    NotificationActions.removeNotification(id);
  }

  render() {
    const notifications = this.state.notifications.map((notification, index) =>
      (<NotificationContainer
        key={notification.id}
        index={index}
        notification={notification}
        onDismiss={() => { this.handleDismiss(notification.id); }}
      />),
    );

    return (
      <div>
        {notifications}
      </div>
    );
  }
}
