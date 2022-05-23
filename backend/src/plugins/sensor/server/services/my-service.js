'use strict';

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
  
  async getSensorTypes(ctx) {
    const { params: { room_id } } = ctx; 

    const sensorTypes = parseInt(room_id)
      ? await strapi.query('plugin::sensor.sensor').findMany({ where: { room_id } })
      : await strapi.query('plugin::sensor.sensor').findMany()

    return sensorTypes;
  },
  
  async getSensorData(ctx) {
    const { request: { body = {} } } = ctx;
    const {
      startTimeStamp,
      endTimeStamp,
      sensor_id
    } = body;
    const { formatDate, formatTime } = strapi.plugin('sensor').service('sensor');

    const startDate = new Date(startTimeStamp);
    const endDate = new Date(endTimeStamp);
    const formattedEndDate = formatDate(endTimeStamp);
    const formattedStartDate = formatDate(startTimeStamp);

    const data = await strapi
      .query('plugin::sensor.sensor-value').findMany({
        where: {
          date: {
            $gte: formattedStartDate,
            $lte: formattedEndDate
          },
          sensor_id
        },
      });

    const filteredData = data.reduce((acc, elem) => {
      const { date, time } = elem;

      const dateFromRequest = new Date(`${date}T${time}Z`);

      if (dateFromRequest >= startDate && dateFromRequest <= endDate) {
        acc.push(elem);
      }

      return acc;
    }, []);

    return filteredData;
  },

  async getRooms(ctx) {
    const { params: { id } } = ctx; 

    const rooms = parseInt(id)
      ? await strapi.query('plugin::sensor.room').findMany({ populate: { room_image: true }, where: { id }})
      : await strapi.query('plugin::sensor.room').findMany({ populate: { room_image: true }})

    return rooms;
  },
  
  async getTypes() {
    const rooms = await strapi
      .query('plugin::sensor.sensor-type')
      .findMany()

    return rooms;
  },
  
  async addRoom(ctx) {
    const { request: { body = {} } } = ctx;
    const room = await strapi.entityService.create('plugin::sensor.room', {
      data: {
        ...body
      }
    });

    return room;
  },
  
  async addSensor(ctx) {
    const { request: { body = {} } } = ctx;
    const sensor = await strapi.entityService.create('plugin::sensor.sensor', {
      data: {
        ...body
      }
    });

    return sensor;
  },
  
  async addSensorData(ctx) {
    const { request: { body = {} } } = ctx;
    const { id, value } = body;
    
    const sensorRules = await strapi.query('plugin::sensor.notification-rule').findMany({ where: { sensor_id: id }});
    const { room_id, type_id } = await strapi.query('plugin::sensor.sensor').findOne({ where: { id }});
    const room_rules = await strapi.query('plugin::sensor.notification-rule').findMany({ where: { room_id }});
    const { compare } = strapi.plugin('sensor').service('myService');

    await sensorRules.forEach(async rule => {
      const {
        logical_operator,
        sensor_type_id,
        value: ruleValue,
        id: notifiation_rule_id,
        message
      } = rule;

      if (type_id === sensor_type_id) {
        if (compare(logical_operator, value, ruleValue)) {
          await strapi.entityService.create('plugin::sensor.notification', {
            data: {
              message,
              notifiation_rule_id
            }
          });
        }
      }
    });

    await room_rules.forEach(async rule => {
      const {
        logical_operator,
        sensor_type_id,
        value: ruleValue,
        id: notifiation_rule_id,
        room_id: rule_room_id,
        message
      } = rule;

      if (rule_room_id === room_id) {
        if (type_id === sensor_type_id) {
          if (compare(logical_operator, value, ruleValue)) {
            await strapi.entityService.create('plugin::sensor.notification', {
              data: {
                message,
                notifiation_rule_id
              }
            });
          }
        }
      }
    })

    const now = new Date();
    const time = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+'.'+'000';

    console.log(time);

    const sensor = await strapi.entityService.create('plugin::sensor.sensor-value', {
      data: {
        date: strapi.plugin('sensor').service('sensor').formatDate(now.getTime()),
        time: strapi.plugin('sensor').service('sensor').formatTime(time),
        value,
        sensor_id: id
      }
    });

    return sensor;
  },

  compare(operatorString, aValue, bValue) {
    let result = false;
    const firstValue = parseInt(aValue);
    const secondValue = parseInt(bValue);

    console.log(operatorString, aValue, bValue);

    switch (operatorString)
    {
      case '>':
        result = firstValue > secondValue;
        break;
      case '<':
        result = firstValue < secondValue;
        break;
      case '<=':
        result = firstValue <= secondValue;
        break;
      case '>=':
        result = firstValue >= secondValue;
        break;
      case '==':
        result = firstValue == secondValue;
        break;
      default: 
        result = firstValue == secondValue;
    }

    return result;
  },

  async getSensorNotifications(ctx) {
    const { request: { body = {} } } = ctx;
    const {
      room_id,
      sensor_id,
      sensor_type_id,
      startTimeStamp,
      endTimeStamp
    } = body;

    const { formatDate, formatTime } = strapi.plugin('sensor').service('sensor');

    const startDate = new Date(startTimeStamp);
    const endDate = new Date(endTimeStamp);

    let whereObject = {
      // createdAt: {
      //   $gte: startDate,
      //   $lte: endDate
      // }
    }
    whereObject = room_id ? {
      ...whereObject,
      room_id
    } : whereObject;
    whereObject = sensor_id ? {
      ...whereObject,
      sensor_id
    } : whereObject;
    whereObject = sensor_type_id ? {
      ...whereObject,
      sensor_type_id
    } : whereObject;

    const notificationData = await strapi.query('plugin::sensor.notification-rule').findMany(
      { where: whereObject}
    );

    const notificationIds = notificationData.reduce((acc, { id }) =>  {
      acc.push(id);
      return acc;
    }, [])

    const notifications = await strapi.query('plugin::sensor.notification').findMany(
      { where: {
        notifiation_rule_id: {
          $in: notificationIds
        },
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      }}
    );

    return notifications;
  },

});
