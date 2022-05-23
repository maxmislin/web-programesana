import { PureComponent } from 'react';

import Notifications from './Notifications.component';
import { getRooms, getSensors, getTypes, getSensorNotifications } from '../../util/API/endpoint/Sensor';


export class NotificationsContainer extends PureComponent {
    state = {
        rooms: [],
        sensorTypes: [],
        sensors: [],
        endTime: '00:00:00',
        startTime: '00:00:00',
        startDate: new Date(),
        endDate: new Date(),
        selectedSensorType: 0,
        selectedSensor: 0,
        selectedRoom: 0,
        notifications: []
    }

    containerProps = () => {
        const {
            startDate,
            endDate,
            endTime,
            startTime,
            rooms,
            sensorTypes,
            sensors,
            notifications
        } = this.state;

        return {
            startDate,
            endDate,
            rooms,
            sensorTypes,
            sensors,
            endTime,
            startTime,
            notifications
        };
    }

    containerFunctions = {
        onGetDataClick: this.onGetDataClick.bind(this),
        setContainerState: this.setContainerState.bind(this)
    };

    componentDidMount() {
        getRooms().then(({ data: { rooms } = {} }) => this.setState({ rooms }));
        getTypes().then(({ data: { sensorTypes } = {} }) => this.setState({ sensorTypes }));
        getSensors().then(({ data: { sensors } = {} }) => this.setState({ sensors }));
    }

    setContainerState(name, value) {
        this.setState({ [name]: value });
    }

    onGetDataClick() {
        const { startDate, endDate, startTime, endTime, selectedRoom, selectedSensor, selectedSensorType } = this.state;
        const startTimeArray = startTime.split(':');
        const endTimeArray = endTime.split(':');

        startDate.setHours(startTimeArray[0]);
        startDate.setMinutes(startTimeArray[1]);
        startDate.setSeconds(startTimeArray[2]);

        endDate.setHours(endTimeArray[0]);
        endDate.setMinutes(endTimeArray[1]);
        endDate.setSeconds(endTimeArray[2]);

        getSensorNotifications({
            startTimeStamp: startDate.getTime() + 7200000,
            endTimeStamp: endDate.getTime() + 7200000,
            sensor_id: selectedSensor,
            room_id: selectedRoom,
            semsor_type_id: selectedSensorType
        }).then(({ data: { notifications } } ) => this.setState({ notifications }));
    }

    render() {
        return (
            <Notifications
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default NotificationsContainer;
 