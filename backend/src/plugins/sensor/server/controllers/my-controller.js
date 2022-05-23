'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('sensor')
      .service('myService')
      .getWelcomeMessage();
  },

  async getSensors(ctx) {
    const sensors = await strapi.plugin('sensor').service('myService').getSensorTypes(ctx);

    ctx.send({ sensors });
  },
  
  async getTypes(ctx) {
    const sensorTypes = await strapi.plugin('sensor').service('myService').getTypes();

    ctx.send({ sensorTypes });
  },
  
  async getRooms(ctx) {
    const rooms = await strapi.plugin('sensor').service('myService').getRooms(ctx);

    ctx.send({ rooms });
  },
  
  async getData(ctx) {
    const sensorData = await strapi.plugin('sensor').service('myService').getSensorData(ctx);

    ctx.send({ sensorData });
  },
  
  async addRoom(ctx) {
    const room = await strapi.plugin('sensor').service('myService').addRoom(ctx);

    ctx.send({ room });
  },
  
  async addSensor(ctx) {
    const sensor = await strapi.plugin('sensor').service('myService').addSensor(ctx);

    ctx.send({ sensor });
  },
  
  async addSensorData(ctx) {
    const sensor = await strapi.plugin('sensor').service('myService').addSensorData(ctx);

    ctx.send({ sensor });
  },
  
  async getSensorNotifications(ctx) {
    const notifications = await strapi.plugin('sensor').service('myService').getSensorNotifications(ctx);

    ctx.send({ notifications });
  },
};
