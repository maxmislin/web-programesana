'use strict';

/**
 *  service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = () => ({ 
    ...createCoreService('plugin::sensor.sensor'),
    
    formatDate(date) {
        const dateObject = new Date(date)
      
        return dateObject.toISOString().split('T')[0];
    },
    
    formatTime(time) {
        return `${time.split(':').map(e => `0${e}`.slice(-2)).join(':')}.000`;
    }
});
