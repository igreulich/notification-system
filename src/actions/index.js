import NotificationConstants from '../constants';
import NotificationDispatcher from '../dispatcher';

const { ActionTypes } = NotificationConstants;

export function addNotification(notification) {
  NotificationDispatcher.handleViewAction({
    type: ActionTypes.ADD_NOTIFICATION,
    body: notification,
  });
}

export function removeNotification(id) {
  NotificationDispatcher.handleViewAction({
    type: ActionTypes.REMOVE_NOTIFICATION,
    body: id,
  });
}
