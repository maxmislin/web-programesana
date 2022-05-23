import { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import Histogram from 'react-chart-histogram';

import 'react-datepicker/dist/react-datepicker.css';
import './SensorDetailPage.style.scss';


export class SensorDetailPage extends PureComponent {
    renderInputs() {
        const {
            setContainerState,
            startDate,
            startTime,
            endDate,
            onGetDataClick,
            endTime
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
                    <div className="SensorDetailPage-InputLabel">Detalization:</div>
                    <select onChange={ e => setContainerState('detalization', e.target.value)} name="detalization" id="detalization-select">
                        <option value="day">Day</option>
                        <option value="hour">Hour</option>
                    </select>
                </div>
                <div className="SensorDetailPage-CheckboxContainer">
                    <div className="SensorDetailPage-InputContainer">
                        <input onChange={ e => setContainerState('avg_cons', e.target.checked)} type="checkbox" id="avg_cons" name="avg_cons" value="avg_cons"/>
                        <label className="SensorDetailPage-InputLabel" htmlFor="avg_cons">Average consumtion</label>
                    </div>
                    <div className="SensorDetailPage-InputContainer">
                        <input onChange={ e => setContainerState('cons_diff', e.target.checked)} type="checkbox" id="cons_diff" name="cons_diff" value="cons_diff"/>
                        <label className="SensorDetailPage-InputLabel" htmlFor="cons_diff">Consumption difference with the previous period</label>
                    </div>
                </div>
                <button onClick={ onGetDataClick } className="btn btn-primary">Get data</button>
            </div>
        );
    }

    renderChart() {
        const { formattedSensorData: { labels = [], data = [] } = {} } = this.props;

        if (labels.length === 0) return null;

        const options = { fillColor: '#ffa500', strokeColor: '#0000FF' };

        return (
            <div>
                <Histogram
                    xLabels={labels}
                    yValues={data}
                    width='1000'
                    height='500'
                    options={options}
                />
            </div>
        )
      }

    render() {
        return (
            <div className="SensorDetailPage">
                { this.renderInputs() }
                { this.renderChart() }
            </div>
        );
    }
}

export default SensorDetailPage;
 