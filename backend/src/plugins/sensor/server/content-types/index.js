'use strict';

const sensorValue = require('./sensor-value');
const sensorType = require('./sensor-type');
const sensor = require('./sensor');
const room = require('./room');
const notificationRule = require('./notification-rule');
const notification = require('./notification');

module.exports = {
    sensor: { schema: sensor },
    'sensor-value': { schema: sensorValue },
    'sensor-type': { schema: sensorType },
    room: { schema: room },
    'notification-rule': { schema: notificationRule },
    notification: { schema: notification }
};

