var socketService = new WebSocketRails(window.location.hostname + (location.port ? ':' + location.port : '') + '/websocket');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Notifications = React.createClass({
  connectWithSocketService: function() {
    var _this = this
    var socket = this.props.socketService
    socket.bind('data',this.handleAdd);
  },
  componentWillMount: function() {
    this.connectWithSocketService()
  },
  handleAdd: function(notification) {
    var newNotifications = this.state.notifications.concat(notification);
    this.setState({notifications: newNotifications});
  },
  handleRemove: function(i) {
    var newNotifications = this.state.notifications;
    newNotifications.splice(i,1);
    this.setState({notifications: newNotifications});
  },
  getInitialState: function() {
    return {
      notifications: []
    };
  },
  render: function() {
    var notifications = this.state.notifications.map(function(notification,i) {
      return (
        <li key={notification.key} className="notifications-list__item">
          {notification.text}
        </li>
      );
    }.bind(this));
    return(
      <div className="notifications-container">
        <ReactCSSTransitionGroup transitionName="notification" component="ol" className="notifications-list">
          {notifications}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
});

React.render(
  <Notifications socketService={socketService} />, 
  document.body.appendChild(document.createElement('div'))
);