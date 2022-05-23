'use strict';

module.exports = ({ strapi }) => ({ 
  async getSensorTypes() {
    const sensorTypes = await strapi
      .query('plugin::sensor.sensor-value')
      .findMany()

    return sensorTypes;
  },
});
