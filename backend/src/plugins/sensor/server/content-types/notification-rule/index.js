'use strict';

module.exports = {
  kind: 'collectionType',
  collectionName: 'notification_rules',
  info: {
    singularName: 'notification-rule',
    pluralName: 'notification-rules',
    displayName: 'Notification Rule'
  },
  options: {
    draftAndPublish: false,
    comment: ''
  },
  attributes: {
    type: {
      type: 'string'
    },
    room_id: {
      type: 'integer'
    },
    sensor_id: {
      type: 'integer'
    },
    sensor_type_id: {
      type: 'integer'
    },
    logical_operator: {
      type: 'string'
    },
    value: {
      type: 'string'
    },
    message: {
      type: 'string'
    }
  }
};