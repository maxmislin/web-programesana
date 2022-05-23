import { PureComponent } from 'react';

import ComparePage from './ComparePage.component';
import { getRooms, getTypes, getSensors, getSensorData } from '../../util/API/endpoint/Sensor';


export class ComparePageContainer extends PureComponent {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        rooms: [],
        sensorTypes: [],
        endTime: '00:00:00',
        startTime: '00:00:00',
        selectedType: 0,
        selectedRooms: [],
        chartDataArray: {}
    }

    containerProps = () => {
        const {
            startDate,
            endDate,
            chartDataArray,
            endTime,
            startTime,
            rooms,
            sensorTypes,
            selectedType
        } = this.state;

        return {
            startDate,
            endDate,
            chartDataArray,
            endTime,
            startTime,
            rooms,
            sensorTypes,
            selectedType
        };
    }

    containerFunctions = {
        setContainerState: this.setContainerState.bind(this),
        onGetDataClick: this.onGetDataClick.bind(this),
        selectRoom: this.selectRoom.bind(this)
    };

    setContainerState(name, value) {
        this.setState({ [name]: value });
    }

    componentDidMount() {
        getRooms().then(({ data: { rooms } = {} }) => this.setState({ rooms }));
        getTypes().then(({ data: { sensorTypes } = {} }) => this.setState({ sensorTypes }, () => {
            const { sensorTypes: [{ id }]} = this.state;
            this.setState({ selectedType: id });
        }));
    }

    async onGetDataClick() {
        const { selectedRooms, selectedType, rooms } = this.state;

        const finalChartDataArray = await getSensors().then(async req => {
            const { data: { sensors } } = req;

            const chartDataArray = await sensors.reduce(async (acc, elem) => {
                const { labels = [], data = [] } = await acc;
                const { id, room_id, type_id } = elem;

                if (selectedRooms.includes(`${room_id}`) && type_id == selectedType) {
                    const value = await this.getChartData(id);
                    const { name: rooomName } = rooms.find(({ id }) => id == room_id);

                    labels.push(rooomName);
                    data.push(value);
                }

                return {
                    labels,
                    data 
                };
            }, {})

            return chartDataArray;
        });

        this.setState({ chartDataArray: finalChartDataArray });
    }

    getChartData(id) {
        const { startDate, endDate, startTime, endTime } = this.state;
        const startTimeArray = startTime.split(':');
        const endTimeArray = endTime.split(':');

        startDate.setHours(startTimeArray[0]);
        startDate.setMinutes(startTimeArray[1]);
        startDate.setSeconds(startTimeArray[2]);

        endDate.setHours(endTimeArray[0]);
        endDate.setMinutes(endTimeArray[1]);
        endDate.setSeconds(endTimeArray[2]);

        return getSensorData({
            startTimeStamp: startDate.getTime() + 7200000,
            endTimeStamp: endDate.getTime() + 7200000,
            sensor_id: id
        }).then((data) => this.getAverageValue(data));
    }

    getAverageValue = (data) => {
        const { data: { sensorData = [] } = {} } = data;
        const fullSum = sensorData.reduce((acc, { value }) => acc + parseInt(value), 0);

        return fullSum/sensorData.length;
    }

    arrayRemove(arr, value) { 
    
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }

    selectRoom(e) {
        const { selectedRooms } = this.state;

        if (selectedRooms.includes(e.target.value)) {
            const newArr = this.arrayRemove(selectedRooms, e.target.value);

            this.setState({selectedRooms: newArr});
        } else {
            selectedRooms.push(e.target.value);

            this.setState({selectedRooms});
        }
    }

    render() {
        return (
            <ComparePage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default ComparePageContainer;
 