import { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import Histogram from 'react-chart-histogram';

import 'react-datepicker/dist/react-datepicker.css';
import '../SensorDetailPage/SensorDetailPage.style.scss';


export class ComparePage extends PureComponent {
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
                    <div className="SensorDetailPage-InputLabel">Type:</div>
                    { this.renderTypes() }
                </div>
                <div className="SensorDetailPage-InputContainer">
                    <div className="SensorDetailPage-InputLabel">Rooms:</div>
                { this.renderRooms() }
                </div>
                <button onClick={ onGetDataClick } className="btn btn-primary">Get data</button>
            </div>
        );
    }

    renderTypes() {
        const { sensorTypes, setContainerState, selectedType } = this.props;

        return (
            <div className="SensorDetailPage-RowData">
                { sensorTypes.map((type) => {
                    const { name, id } = type;

                    return (
                        <div className="SensorDetailPage-InputContainer">
                            <input
                              checked={ parseInt(selectedType) === id }
                              onChange={ e => setContainerState('selectedType', e.target.value)}
                              type="radio" id={ id } name="type"
                              value={ id }
                            />
                            <label className="SensorDetailPage-InputLabel" htmlFor={ id }>{ name }</label>
                        </div>
                    ); 
                }) }
            </div>
        );
    }
    
    renderRooms() {
        const { rooms, selectRoom } = this.props;

        return (
            <div className="SensorDetailPage-RowData">
                { rooms.map((type) => {
                    const { name, id } = type;

                    return (
                        <div className="SensorDetailPage-InputContainer">
                            <input
                              onChange={ selectRoom }
                              type="checkbox" id={ id } name={ name }
                              value={ id }
                            />
                            <label className="SensorDetailPage-InputLabel" htmlFor={ id }>{ name }</label>
                        </div>
                    ); 
                }) }
            </div>
        );
    }

    renderChart() {
        const { chartDataArray: { labels = [], data = [] } = {} } = this.props;

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

export default ComparePage;
 