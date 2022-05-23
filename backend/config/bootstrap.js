// 'use strict';

// const filenames = [
//     'elektro_ievads_3f'
// ];

// module.exports = () => {
//     var convert = require('xml-js');
//     var xml = require('fs').readFileSync(`./data/${filenames[0]}.xml`, 'utf8');
    
//     var result = convert.xml2json(xml, {compact: true, spaces: 4});
    
//     console.log(strapi);
//     addDatabaseData(result, filenames[0], strapi);
// };

// function addDatabaseData(xml, name, strapi) {
//     const { data: { records: { record } = {} } = {} } = JSON.parse(xml);

//     record.forEach(element => {
//         const { Date = {}, Time = {}, Value = {} } = element
        
//         strapi.services.sensor.create({
//             Date: Date._text,
//             Time: Date._text,
//             Value: Value._text,
//             Type: name
//         })

//         return;
//         console.log(Date, Time, Value);
//     });
// }