'use strict';

module.exports = {
  collectionName: 'sensor-values',
  info: {
    name: 'sensor-value',
    description: '',
    singularName: 'sensor-value',
    pluralName: 'sensor-values',
    displayName: 'Sensor value',
  },
  options: {
    draftAndPublish: false,
    timestamps: true
  },
  attributes: {
    date: {
      type: 'date'
    },
    time: {
      type: 'time'
    },
    value: {
      type: 'string'
    },
    sensor_id: {
      type: 'integer'
    }
  }
};