'use strict';

module.exports = {
  kind: 'collectionType',
  collectionName: 'notifications',
  info: {
    singularName: 'notification',
    pluralName: 'notifications',
    displayName: 'Notification'
  },
  options: {
    draftAndPublish: false,
    comment: ''
  },
  attributes: {
    notifiation_rule_id: {
      type: 'integer'
    },
    message: {
      type: 'string'
    }
  }
};
