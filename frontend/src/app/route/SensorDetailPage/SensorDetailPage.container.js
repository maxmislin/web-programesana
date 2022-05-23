import { PureComponent } from 'react';

import SensorDetailPage from './SensorDetailPage.component';
import { getSensorData } from '../../util/API/endpoint/Sensor';

export class SensorDetailPageContainer extends PureComponent {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        cons_diff: false,
        avg_cons: false,
        detalization: 'day',
        sensorData: [],
        prevAvgCons: 0,
        avgConsValue: 0,
        consDiffValue: 0,
        formattedSensorData: {},
        endTime: '00:00:00',
        startTime: '00:00:00'
    }

    containerProps = () => {
        const {
            startDate,
            endDate,
            formattedSensorData,
            endTime,
            startTime
        } = this.state;

        return {
            startDate,
            endDate,
            formattedSensorData,
            endTime,
            startTime
        };
    }

    containerFunctions = {
        setContainerState: this.setContainerState.bind(this),
        onGetDataClick: this.onGetDataClick.bind(this)
    };

    setContainerState(name, value) {
        this.setState({ [name]: value });
    }

    onGetDataClick() {
        const { match: { params: { id } = {} } = {}  } = this.props;
        const { startDate, endDate, startTime, endTime } = this.state;
        const startTimeArray = startTime.split(':');
        const endTimeArray = endTime.split(':');

        startDate.setHours(startTimeArray[0]);
        startDate.setMinutes(startTimeArray[1]);
        startDate.setSeconds(startTimeArray[2]);

        endDate.setHours(endTimeArray[0]);
        endDate.setMinutes(endTimeArray[1]);
        endDate.setSeconds(endTimeArray[2]);

        console.log({
            startTimeStamp: startDate.getTime(),
            endTimeStamp: endDate.getTime(),
            sensor_id: id
        })

        getSensorData({
            startTimeStamp: startDate.getTime() + 7200000,
            endTimeStamp: endDate.getTime() + 7200000,
            sensor_id: id
        }).then((data) => this.getDataForChart(data));
    }
    
    getDataForChart = (data) => {
        const { data: { sensorData = [] } = {} } = data;
        const {
            avg_cons,
            cons_diff,
            detalization,
            avgConsValue: currentAvgConsValue
        } = this.state;
        let day = '';
        let sum = 0;
        let counter = 0;
        let fullSum = 0

        const formattedSensorData = sensorData.reverse().reduce((acc, elem, index) => {
            const { labels = [], data = [] } = acc;
            const { date, value } = elem;

            if (detalization === 'day') {
                const isDateSame = date === day;

                if ((!isDateSame && day) || index + 1 === sensorData.length) {
                    labels.push(day);
                    data.push(sum/counter);
                }

                day = date;
                sum = isDateSame ? sum + parseInt(value) : parseInt(value);
                counter = isDateSame ? counter + 1 : 1;
            } else {
                labels.push(`${elem.date} ${elem.time}`);
                data.push(elem.value);
            }

            fullSum = fullSum + parseInt(value);

            if (index + 1 === sensorData.length) {
                const avgConsValue = fullSum/sensorData.length;

                if (avg_cons) {
                    labels.push('Average consumption');
                    data.push(avgConsValue);
                }

                if (cons_diff) {
                    labels.push('Prev consumption diff');
                    data.push(avgConsValue - currentAvgConsValue);
                }
            }

            return {
                labels,
                data
            };
        }, {});

        const avgConsValue = fullSum/sensorData.length;
        
        this.setState({
            formattedSensorData,
            avgConsValue
        })
    }

    render() {
        console.log(this.state);
        return (
            <SensorDetailPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default SensorDetailPageContainer;
 