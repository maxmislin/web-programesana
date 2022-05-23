'use strict';

module.exports = {
  kind: 'collectionType',
  collectionName: 'rooms',
  info: {
    singularName: 'room',
    pluralName: 'rooms',
    displayName: 'Room'
  },
  options: {
    draftAndPublish: false,
    comment: ''
  },
  attributes: {
    name: {
      type: 'string'
    },
    room_code: {
      type: 'string'
    },
    room_image: {
      type: 'media',
      multiple: false
    }
  }
};