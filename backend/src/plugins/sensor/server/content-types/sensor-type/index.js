'use strict';

module.exports = {
  kind: 'collectionType',
  collectionName: 'sensor_types',
  info: {
    singularName: 'sensor-type',
    pluralName: 'sensor-types',
    displayName: 'Sensor type'
  },
  options: {
    draftAndPublish: false,
    comment: ''
  },
  attributes: {
    name: {
      type: 'string'
    },
    sensor_type_code: {
      type: 'string'
    }
  }
};