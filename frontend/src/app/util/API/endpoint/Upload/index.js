import BackendAPI from '../../provider/BackendAPI';

export const upload = (formData) => BackendAPI.post('/api/upload', formData) || {};
