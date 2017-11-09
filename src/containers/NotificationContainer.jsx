import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TimelineMax from 'gsap/TimelineMax';
import { Expo } from 'gsap/EasePack';

import * as NotificationActions from '../actions';
import NotificationConstants from '../constants';

import Notification from '../components/Notification';

const AUTO_DISMISS_TIME = NotificationConstants.autodismissTime;
const CONTENT_SPACING = 16;
const HIDDEN = 'is-hidden';
const NOTIFICATION_TIMING = 0.5;
const UHIDDEN = 'u-hidden';

export default class NotificationContainer extends Component {
  static propTypes = {
    notification: PropTypes.object.isRequired,
    onDismiss: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    onComplete: PropTypes.func,
    onReverseComplete: PropTypes.func,
    onReverseStart: PropTypes.func,
    onStart: PropTypes.func,
  };

  static defaultProps = {
    onComplete: () => {},
    onDismiss: () => {},
    onReverseComplete: () => {},
    onReverseStart: () => {},
    onStart: () => {},
  };

  componentDidMount() {
    const $notification = ReactDOM.findDOMNode(this.notification); // eslint-disable-line react/no-find-dom-node
    /* Since we use `reverse()` to show the notification,
     * which adds the alt of the default props,
     * we need to seperate this out from the timeline
     */
    const bottomSpacing = new TimelineMax({ paused: true })
      .to($notification, NOTIFICATION_TIMING, {
        marginBottom: (CONTENT_SPACING / 2),
        ease: Expo.easeInOut,
      });

    let forward = true;
    let lastTime = 0;

    // Attach GSAP
    $notification.timeline = new TimelineMax({
      paused: true,
      onStart: () => {
        bottomSpacing.reverse(); // Remove bottom spaceing for stacked notifications

        $notification.setAttribute('aria-hidden', true);

        this.props.onStart();
      },
      onUpdate: () => {
        const newTime = $notification.timeline.time();
        if ((forward && newTime < lastTime) || (!forward && newTime > lastTime)) {
          forward = !forward;
          if (!forward) {
            this.props.onReverseStart();

            bottomSpacing.play(); // Bottom spacing for stacked notifications

            $notification.classList.remove(HIDDEN);
            $notification.classList.remove(UHIDDEN);

            $notification.setAttribute('aria-hidden', false);
          }
        }
        lastTime = newTime;
      },
      onComplete: () => {
        $notification.classList.remove(HIDDEN);

        NotificationActions.removeNotification(this.props.notification.id);

        this.props.onComplete();
      },
      onReverseComplete: () => {
        this.props.onReverseComplete();
      },
    });

    $notification.timeline.to($notification, NOTIFICATION_TIMING, {
      css: {
        marginTop: -$notification.offsetHeight,
        transformOrigin: 'center center',
        y: '50%',
        opacity: 0,
      },
      ease: Expo.easeInOut,
    });

    /* Since `componentDidMount()` is run on render and thus starts the animation,
     * we progress the animation to the end; which "shows" the notification,
     * and then play the animation, after the interval, in reverse.
     */
    $notification.timeline.progress(1, true).reverse();

    setTimeout(() => {
      if ($notification.timeline.progress() !== 1) {
        $notification.timeline.play();
      }
    }, AUTO_DISMISS_TIME);
  }

  hideNotification = () => {
    const $notification = ReactDOM.findDOMNode(this.notification); // eslint-disable-line react/no-find-dom-node

    $notification.timeline.play();
  };

  render() {
    const { body, icon, type } = this.props.notification;

    return (
      <Notification
        ref={(ref) => { this.notification = ref; }}
        type={type}
        icon={icon}
        body={body}
        onDismiss={this.hideNotification}
      />
    );
  }
}
