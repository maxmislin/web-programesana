import BackendAPI from '../../provider/BackendAPI';

export const getSensors = (room_id = 0) => BackendAPI.get(`/api/sensor/getSensors/${room_id}`) || {};

export const getTypes = () => BackendAPI.get(`/api/sensor/getTypes`) || {};

export const getRooms = (id = 0) => BackendAPI.get(`/api/sensor/getRooms/${id}`) || {};

export const getSensorData = (data) => BackendAPI.post('/api/sensor/getSensorData', data) || {};

export const addRoom = (data) => BackendAPI.post('/api/sensor/addRoom', data) || {};

export const addSensor = (data) => BackendAPI.post('/api/sensor/addSensor', data) || {};

export const getSensorNotifications = (data) => BackendAPI.post('/api/sensor/getSensorNotifications', data) || {};
