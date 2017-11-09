import EventEmitter from 'events';

import NotificationConstants from '../constants';
import NotificationDispatcher from '../dispatcher';

const { ActionTypes } = NotificationConstants;
const CHANGE_EVENT = 'change';
const _notifications = [];
let _id = 0;

class NotificationStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  listen(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  unlisten(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getState = () => ({ notifications: _notifications.slice() })
}

const Store = new NotificationStore();

function _addNotification(notification) {
  const _notification = Object.assign({}, notification, { id: _id += 1 });

  _notifications.unshift(_notification);
}

function _removeNotification(id) {
  const index = _notifications.map(notification => notification.id).indexOf(id);

  if (index !== -1 && _notifications[index]) {
    const dismissEvent = _notifications[index].onDismiss;

    _notifications.splice(index, 1);

    if (dismissEvent) {
      dismissEvent();
    }
  }
}

Store.dispatchToken = NotificationDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      _addNotification(action.body);
      break;

    case ActionTypes.REMOVE_NOTIFICATION:
      _removeNotification(action.body);
      break;

    default:
      return true;
  }

  Store.emitChange();

  return true;
});

export default Store;
