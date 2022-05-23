module.exports = ({ env }) => ({
    sensor: {
      enabled: true,
      resolve: './src/plugins/sensor',
      config: {
        // user plugin config goes here
      },
    }
  });
   