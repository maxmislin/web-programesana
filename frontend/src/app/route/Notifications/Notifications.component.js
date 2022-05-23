import { PureComponent } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '../SensorDetailPage/SensorDetailPage.style.scss'


export class Notifications extends PureComponent {
    renderFilters() {
        const {
            setContainerState,
            startDate,
            startTime,
            endDate,
            onGetDataClick,
            endTime,
            sensors,
            rooms,
            sensorTypes
        } = this.props;

        return (
            <div className="SensorDetailPage-Inputs">
                <div className="SensorDetailPage-InputContainer">
                    <div className="SensorDetailPage-InputLabel">Start date:</div>
                    <DatePicker selected={startDate} onChange={(date) => setContainerState('startDate', date)} />
                </div>
                <div className="SensorDetailPage-InputContainer">
                    <div className="SensorDetailPage-InputLabel">Start time(hh:mm:ss):</div>
                    <input type="text" value={startTime} onChange={(e) => setContainerState('startTime', e.target.value)} />
                </div>
                <div className="SensorDetailPage-InputContainer">
                    <div className="SensorDetailPage-InputLabel">End date:</div>
                    <DatePicker selected={endDate} onChange={(date) => setContainerState('endDate', date)} />
                </div>
                <div className="SensorDetailPage-InputContainer">
                    <div className="SensorDetailPage-InputLabel">End time(hh:mm:ss):</div>
                    <input type="text" value={endTime} onChange={(e) => setContainerState('endTime', e.target.value)} />
                </div>
                <div className="SensorDetailPage-InputContainer">
                    <div className="SensorDetailPage-InputLabel">Sensor type:</div>
                    <select onChange={ e => setContainerState('selectedSensorType', e.target.value)} name="detalization" id="detalization-select">
                        <option value="">-- Please choose sensor type --</option>
                        { sensorTypes.map((sensorType) => {
                            const { name, id } = sensorType;

                            return (
                                <option value={ id }>{ name }</option>
                            )
                        }) }
                    </select>
                </div>
                <div className="SensorDetailPage-InputContainer">
                    <div className="SensorDetailPage-InputLabel">Sensor:</div>
                    <select onChange={ e => setContainerState('selectedSensor', e.target.value)} name="detalization" id="detalization-select">
                        <option value="">-- Please choose sensor --</option>
                        { sensors.map((room) => {
                            const { name, id } = room;

                            return (
                                <option value={ id }>{ name }</option>
                            )
                        }) }
                    </select>
                </div>
                <div className="SensorDetailPage-InputContainer">
                    <div className="SensorDetailPage-InputLabel">Room:</div>
                    <select onChange={ e => setContainerState('selectedRoom', e.target.value)} name="detalization" id="detalization-select">
                        <option value="">-- Please choose rooom --</option>
                        { rooms.map((room) => {
                            const { name, id } = room;

                            return (
                                <option value={ id }>{ name }</option>
                            )
                        }) }
                    </select>
                </div>
                <button onClick={ onGetDataClick } className="btn btn-primary">Get data</button>
            </div>
        );
    }

    renderNotificationData() {
        const { notifications } = this.props;

        if (notifications.length === 0) return null;

        return (
            <div className="SensorDetailPage-NotificationList">
                <div className="SensorDetailPage-NotificationRow">
                    <div>Notification Rule ID</div>
                    <div>Message</div>
                </div>
                <div>
                { notifications.map((notification) => {
                    const { notifiation_rule_id, message } = notification;
                    return (
                        <div className="SensorDetailPage-NotificationRow">
                            <div>{ notifiation_rule_id }</div>
                            <div>{ message }</div>
                        </div>
                    );
                }) }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="SensorDetailPage">
                { this.renderFilters() }
                { this.renderNotificationData() }
            </div>
        );
    }
}

export default Notifications;
 