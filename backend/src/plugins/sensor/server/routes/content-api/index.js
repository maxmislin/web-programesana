'use strict';

module.exports = {
    type: 'content-api',
    routes: [
      {
        method: 'GET',
        path: '/',
        handler: 'myController.index',
        config: {
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/getSensors/:room_id',
        handler: 'myController.getSensors',
        config: {
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/getTypes',
        handler: 'myController.getTypes',
        config: {
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/getRooms/:id',
        handler: 'myController.getRooms',
        config: {
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/getSensorData',
        handler: 'myController.getData',
        config: {
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/addRoom',
        handler: 'myController.addRoom',
        config: {
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/addSensor',
        handler: 'myController.addSensor',
        config: {
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/addSensorData',
        handler: 'myController.addSensorData',
        config: {
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/getSensorNotifications',
        handler: 'myController.getSensorNotifications',
        config: {
          policies: [],
        },
      }
    ]
};