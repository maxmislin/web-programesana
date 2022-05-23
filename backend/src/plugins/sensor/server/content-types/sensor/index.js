'use strict';

module.exports = {
  kind: 'collectionType',
  collectionName: 'sensors',
  info: {
    singularName: 'sensor',
    pluralName: 'sensors',
    displayName: 'Sensor'
  },
  options: {
    draftAndPublish: false,
    comment: ''
  },
  attributes: {
    name: {
      type: 'string'
    },
    sensor_code: {
      type: 'string'
    },
    room_id: {
      type: 'integer'
    },
    type_id: {
      type: 'integer'
    },
    sensor_x_coord: {
      type: 'integer'
    },
    sensor_y_coord: {
      type: 'integer'
    },
  }
};
