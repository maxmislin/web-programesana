'use strict';

const _ = require('lodash');

// const { FormData, Blob } = require('formdata-node')
// const { Readable } = require('stream')
// const fs = require('fs');

const filenames = [
  'elektro_ievads_3f',
  'Elektro_apgaism',
  'Elektro_piekl',
  'POIC_1_temp',
  'POIC_2_temp',
  'POIC_3_temp',
  'POIC_4_temp',
  'POIC_5_temp',
  'POIC_1_co2',
  'POIC_2_co2',
  'POIC_3_co2',
  'POIC_4_co2',
  'POIC_5_co2',
  'udens',
  'Elektro_kond',
  'POIC_1_mitr',
  'POIC_2_mitr',
  'POIC_3_mitr',
  'POIC_4_mitr',
  'POIC_5_mitr'
];

const sensorNames = {
  'elektro_ievads_3f': 'Elektro ievads 3f',
  'Elektro_apgaism': 'Elektro apgaismojums',
  'Elektro_piekl': 'Elektro piekluve',
  'POIC_1_temp': 'POIC1 temperatura',
  'POIC_2_temp': 'POIC2 temperatura',
  'POIC_3_temp': 'POIC3 temperatura',
  'POIC_4_temp': 'POIC4 temperatura',
  'POIC_5_temp': 'POIC5 temperatura',
  'POIC_1_co2': 'POIC1 CO2',
  'POIC_2_co2': 'POIC2 CO2',
  'POIC_3_co2': 'POIC3 CO2',
  'POIC_4_co2': 'POIC4 CO2',
  'POIC_5_co2': 'POIC5 CO2',
  'udens': 'Udens',
  'Elektro_kond': 'Elektro kondicioners',
  'POIC_1_mitr': 'POIC1 mitrums',
  'POIC_2_mitr': 'POIC2 mitrums',
  'POIC_3_mitr': 'POIC3 mitrums',
  'POIC_4_mitr': 'POIC4 mitrums',
  'POIC_5_mitr': 'POIC5 mitrums'
};

const rooms = {
  'POIC_1': 'POIC1',
  'POIC_2': 'POIC2',
  'POIC_3': 'POIC3',
  'POIC_4': 'POIC4',
  'POIC_5': 'POIC5'
}

const types = {
  'co2': 'CO2',
  'temp': 'Temperatura',
  'mitr': 'Mitrums'
}

const DEFAULT_PERMISSIONS = [
  {
    action: 'plugin::sensor.myController.index', // the action name should be plugin::plugin-name.actionType
    subject: 'public',
  }
];

module.exports = ({ strapi }) => {
  addData(strapi);
};

async function addData(strapi) {
  var convert = require('xml-js');

  await Object.keys(rooms).forEach(async name => {
    await addRoomData(name, strapi);
  })
  
  await Object.keys(types).forEach(async name => {
    await addTypesData(name, strapi);
  })

  filenames.forEach(async name => {
    const xml = require('fs').readFileSync(`./data/${name}.xml`, 'utf8');
    const result = convert.xml2json(xml, {compact: true, spaces: 4});

    await addSensorTypeData(name, strapi);
    await addDatabaseData(result, name, strapi);
  })
}

async function addSensorTypeData(name, strapi) {
  const recordCount = await strapi.query('plugin::sensor.sensor').count({ where: { sensor_code: name } });
  const roomCode = await Object.keys(rooms).reduce(async (acc, roomCode) => {
    if (name.includes(roomCode)) {
      const { id } = await strapi.query('plugin::sensor.room').findOne({ where: { room_code: roomCode } });
      return id;
    }

    return acc;
  }, null);

  const typeCode = await Object.keys(types).reduce(async (acc, typeCode) => {
    if (name.includes(typeCode)) {
      const { id } = await strapi.query('plugin::sensor.sensor-type').findOne({ where: { sensor_type_code: typeCode } });
      return id;
    }

    return acc;
  }, null);

  if (!recordCount) {
    strapi.entityService.create('plugin::sensor.sensor', {
      data: {
        name: sensorNames[name],
        sensor_code: name,
        room_id: roomCode,
        type_id: typeCode
      }
    });
  }
}

async function addTypesData(name, strapi) {
  const recordCount = await strapi.query('plugin::sensor.sensor-type').count({ where: { sensor_type_code: name } });

  if (!recordCount) {
    await strapi.entityService.create('plugin::sensor.sensor-type', {
      data: {
        name: types[name],
        sensor_type_code: name,
      }
    });
  }
}

async function addRoomData(name, strapi) {
  const recordCount = await strapi.query('plugin::sensor.room').count({ where: { room_code: name } });

  if (!recordCount) {
    await strapi.entityService.create('plugin::sensor.room', {
      data: {
        name: rooms[name],
        room_code: name,
      }
    });

    // const { FormDataEncoder } = await import('form-data-encoder');
    // const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    // const file = fs.createReadStream(`./data/images/${name}.png`);
    // const form = new FormData();

    // form.append('files', file);
    // form.append('refId', id); 
    // form.append('ref', 'plugin::sensor.room'); 
    // form.append('field', 'room_image'); 

    // const encoder = new FormDataEncoder(form);

    // await fetch('http://localhost:1337/api/upload', {
    //   method: 'post',
    //   headers: encoder.headers,
    //   body: Readable.from(encoder)
    // });
  }
}

async function addDatabaseData(xml, name, strapi) {
  const { data: { records: { record } = {} } = {} } = JSON.parse(xml);
  const { id: sensorId } = await strapi.query('plugin::sensor.sensor').findOne({ where: { sensor_code: name } });
  const recordCount = await strapi.query('plugin::sensor.sensor-value').count({ where: { sensor_id: sensorId } });

  if (!recordCount) {
    record.forEach(element => {
      const { Date: recordDate = {}, Time = {}, Value = {} } = element

      strapi.entityService.create('plugin::sensor.sensor-value', {
        data: {
          date: strapi.plugin('sensor').service('sensor').formatDate(recordDate._text),
          time: strapi.plugin('sensor').service('sensor').formatTime(Time._text),
          value: Value._text,
          sensor_id: sensorId
        }
      });
    });
  }
}
