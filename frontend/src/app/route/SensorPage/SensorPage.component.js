import { PureComponent } from 'react';

import './SensorPage.style.scss'

export class SensorPage extends PureComponent {
    renderSensor = (sensor) => {
        const { name, id, sensor_code } = sensor;

        return (
            <a key={id} href={ `/sensor/${id}` } className="SensorPage-SensorContainer card">
                <div className="SensorPage-SensorName">{ name }</div>
                <div>{ `ID: ${id}`}</div>
                <div>{ `Sensor code: ${sensor_code}` }</div>
            </a>
        )
    }
    renderSensors() {
        const { sensors } = this.props;

        return (
            <div className="SensorPage-SensorList">
                { sensors.map(this.renderSensor) }
            </div>
        )
    }

    render() {
        return (
            <div className="SensorPage">
                { this.renderSensors() }
            </div>
        );
    }
}

export default SensorPage;
 